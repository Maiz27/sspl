import logger from '@adonisjs/core/services/logger'
import db from '@adonisjs/lucid/services/db'

export default abstract class BaseService {
  protected logger = logger

  constructor(protected serviceName: string) {}

  /**
   * Log and handle errors that occur in service methods
   */
  protected handleError(error: Error, context: any = {}): void {
    this.logger.error(`[${this.serviceName}] Service error: ${error.message}`, {
      stack: error.stack,
      context,
    })
  }

  /**
   * Safely execute a service operation with error handling
   */
  protected async safeExecute<T>(
    operation: () => Promise<T>,
    errorMessage: string = 'An error occurred during service operation'
  ): Promise<T> {
    try {
      return await operation()
    } catch (error) {
      this.handleError(error, { errorMessage })
      throw error
    }
  }

  /**
   * Execute a service operation inside a database transaction
   */
  protected async withTransaction<T>(callback: (trx: any) => Promise<T>): Promise<T> {
    const trx = await db.transaction()
    try {
      const result = await callback(trx)
      await trx.commit()
      return result
    } catch (error) {
      await trx.rollback()
      this.handleError(error)
      throw error
    }
  }
}
