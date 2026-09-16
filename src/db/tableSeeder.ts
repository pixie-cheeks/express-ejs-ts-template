const delay = (delayInMS: number) =>
  new Promise((resolve) => setTimeout(resolve, delayInMS));

const tableOrderArray = [
  {
    async deleteAllRows() {
      await delay(100);
      console.log('WIP');
    },
    async dropTable() {
      await delay(100);
      console.log('WIP');
    },
  },
];

const resetTables = (): Promise<void[]> =>
  Promise.all(tableOrderArray.map((table) => table.deleteAllRows()));

const dropTables = async (): Promise<void> => {
  for (const table of tableOrderArray) {
    // eslint-disable-next-line no-await-in-loop
    await table.dropTable();
  }
};

const seedTables = async (): Promise<void> => {
  console.log('Will add some seeds later!');
};

export { resetTables, seedTables, dropTables };
