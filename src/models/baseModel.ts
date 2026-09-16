import type { Pool } from 'pg';

interface BaseType {
  id: number;
}

class BaseModel<RowType extends BaseType> {
  protected tableName: string;
  protected pool: Pool;

  constructor(pool: Pool, tableName: string) {
    this.pool = pool;
    this.tableName = tableName;
  }

  async dropTable(): Promise<undefined> {
    await this.pool.query(/* sql */ `DROP TABLE IF EXISTS ${this.tableName};`);
  }

  async getAllRows(): Promise<RowType[]> {
    const { rows } = await this.pool.query<RowType>(/* sql */ `
      SELECT
        *
      FROM
        ${this.tableName};
    `);
    return rows;
  }

  async getRowById(id: number): Promise<RowType | undefined> {
    const { rows } = await this.pool.query<RowType>(
      /* sql */ `
        SELECT
          *
        FROM
          ${this.tableName}
        WHERE
          id = $1;
      `,
      [id],
    );
    return rows.at(0);
  }

  async deleteRowById(id: number): Promise<void> {
    await this.pool.query(
      /* sql */ `
        DELETE FROM ${this.tableName}
        WHERE
          id = $1;
      `,
      [id],
    );
  }

  async deleteAllRows(): Promise<undefined> {
    await this.pool.query(/* sql */ `DELETE FROM ${this.tableName};`);
  }
}

export { BaseModel };
