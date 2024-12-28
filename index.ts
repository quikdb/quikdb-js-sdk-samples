import { QuikDB, CreateSchemaArgs, CanisterMethod }  from 'quikdb-cli-beta/v1/sdk';

// field types are Text, Int, Bool;
let quikdb = new QuikDB();

(async () => {
  await quikdb.init();
  await quikdb.callCanisterMethod(CanisterMethod.InitOwner, []);

  const schemaName = 'uniSchema';

  const fields = [
    { name: 'username', fieldType: 'Text', unique: false },
    { name: 'email', fieldType: 'Text', unique: true },
  ];

  const indexes = ['email'];

  const args: CreateSchemaArgs = [schemaName, fields, indexes];

  const result = await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, args);

  console.log({ result });

  const schema = await quikdb.callCanisterMethod(CanisterMethod.GetSchema, [schemaName]);

  console.log({ schema });
})();