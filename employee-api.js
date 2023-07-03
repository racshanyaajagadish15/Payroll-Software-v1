const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { format } = require('mysql');
const multer = require('multer');
const xlsx = require('xlsx')
const moment = require('moment');



const app = express();
const port = 3000;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'racshanyaa',
  database: 'payroll database',
});

pool.getConnection((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to the database.');
});

app.use(bodyParser.json());

app.post('/employee-add', (req, res) => {
  const employee = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error connecting to the database.');
      return;
    }

    connection.query('INSERT INTO employee_information SET ?', employee, (err, result) => {
      connection.release();

      if (err) {
        console.error(err);
        res.status(500).send('Error saving employee information.');
      } else {
        res.status(200).send('Employee information saved successfully.');
      }
    });
  });
});

app.put('/employee-edit/:id', (req, res) => {
  const { id } = req.params;
  const employee = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error connecting to the database.');
      return;
    }
    connection.query(
      'UPDATE employee_information SET ? WHERE id = ?',
      [employee, id],
      (err, result) => {
        connection.release();

        if (err) {
          console.error(err);
          res.status(500).send('Error updating employee information.');
        } else {
          res.status(200).send('Employee information updated successfully.');
        }
      }
    );
  });
});

app.delete('/employee-delete/:cpf_id', (req, res) => {
  const { cpf_id } = req.params;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error connecting to the database.');
      return;
    }

    connection.query(
      'DELETE FROM employee_information WHERE cpf_id = ?',
      cpf_id,
      (err, result) => {
        connection.release();

        if (err) {
          console.error(err);
          res.status(500).send('Error deleting employee record.');
        } else {
          res.status(200).send('Employee record deleted successfully.');
        }
      }
    );
  });
});

app.get('/employee-information', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error connecting to the database.');
      return;
    }

    connection.query('SELECT * FROM employee_information', (err, results) => {
      connection.release();

      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving employee information.');
      } else {
        res.status(200).json(results);
      }
    });
  });
});

const upload = multer({ dest: '/Users/user/Documents/Computer Science IA/Database/File Uploads' }); 
app.post('/upload-excel', upload.single('file'), (req, res) => {
  // Handle the uploaded file
  const file = req.file;
  if (!file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Use the 'xlsx' package to read the Excel file
  const filePath = file.path;
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert the worksheet data to JSON format
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // Store the JSON data into the 'payroll_excel_upload' table in the database
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error connecting to the database.');
      return;
    }

    const query = 'INSERT INTO payroll_excel_upload (employee_ssid, employee_name, employee_additional_pay, employee_absent_days, employee_overtime_hours, create_user, version) VALUES ?';
    const values = jsonData.map((item) => [
      item.employee_ssid,
      item.employee_name,
      item.employee_additional_pay,
      item.employee_absent_days,
      item.employee_overtime_hours,
      item.create_user,
      item.version
    ]);

    connection.query(query, [values], (err, result) => {
      connection.release();

      if (err) {
        console.error(err);
        res.status(500).send('Error storing Excel data into the database.');
      } else {
        res.status(200).send('Excel data stored successfully.');
      }
    });
  });
});






  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Payroll Software',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: [
      '/Users/user/Documents/Computer Science IA/Payroll Software/JavaScript/employee-api.js',
    ],
    definitions: {
      employee_information: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          employee_ssid: {
            type: 'string',
          },
          employee_name: {
            type: 'string',
          },
          employee_gender: {
            type: 'string',
          },
          employee_address: {
            type: 'string',
          },
          employee_mobile: {
            type: 'string',
          },
          employee_home_phone: {
            type: 'string',
          },
          employee_dob: {
            type: 'string',
            format: 'date',
          },
          employee_nat_id: {
            type: 'string',
          },
          employee_natidexpiry: {
            type: 'string',
            format: 'date',
          },
          employee_race: {
            type: 'string',
          },
          employee_nationality: {
            type: 'string',
          },
          employee_basic_salary: {
            type: 'number',
            format: 'float',
          },
          employee_startdate: {
            type: 'string',
            format: 'date',
          },
          employee_emergency_name: {
            type: 'string',
          },
          employee_emergency_phone: {
            type: 'string',
          },
          employee_perm_add: {
            type: 'string',
          },
          employee_photo: {
            type: 'string',
            format: 'binary',
          },
          employee_signature: {
            type: 'string',
            format: 'binary',
          },
          create_user: {
            type: 'string',
            default: 'admin',
          },
          create_datetime: {
            type: 'string',
            format: 'date-time',
          },
          version: {
            type: 'integer',
            format: 'int32',
          },
        },
        
        },
        CPF: {
            type: 'object',
            properties: {
              cpf_id: {
                type: 'integer',
              },
              cpf_age_from: {
                type: 'number',
                format: 'float',
              },
              cpf_age_to: {
                type: 'number',
                format: 'float',
              },
              cpf_wage_from: {
                type: 'number',
                format: 'float',
              },
              cpf_wage_to: {
                type: 'number',
                format: 'float',
              },
              cpf_employee_share: {
                type: 'string',
                maxLength: 250,
              },
              cpf_employer_share: {
                type: 'string',
                maxLength: 250,
              },
              cpf_slab: {
                type: 'number',
                format: 'float',
              },
              create_user: {
                type: 'string',
                maxLength: 250,
              },
              create_datetime: {
                type: 'string',
                format: 'date-time',
              },
            },
            required: [
              'cpf_id',
              'cpf_age_from',
              'cpf_wage_to',
              'cpf_employee_share',
              'cpf_employer_share',
              'cpf_slab',
              'create_user',
              'create_datetime',
            ],
          },
          Allowance: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
              },
              allowance_name: {
                type: 'string',
              },
              allowance_rate: {
                type: 'number',
                format: 'float',
              },
              create_user: {
                type: 'string',
                maxLength: 250,
              },
              create_datetime: {
                type: 'string',
                format: 'date-time',
              },
              version: {
                type: 'integer',
              },
            },
            required: [
              'id',
              'allowance_name',
              'allowance_rate',
              'create_user',
              'create_datetime',
              'version',
            ],
          }
          
    },

}



app.post('/cpf-add', (req, res) => {
    const cpfRecord = req.body;
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database.');
        return;
      }
  
      connection.query('INSERT INTO cpf SET ?', cpfRecord, (err, result) => {
        connection.release();
  
        if (err) {
          console.error(err);
          res.status(500).send('Error saving CPF record.');
        } else {
          res.status(200).send('CPF record saved successfully.');
        }
      });
    });
  });
  app.put('/cpf-edit/:cpf_id', (req, res) => {
    const { cpf_id } = req.params;
    const cpfRecord = req.body;
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database.');
        return;
      }
  
      connection.query(
        'UPDATE cpf SET ? WHERE cpf_id = ?',
        [cpfRecord, cpf_id],
        (err, result) => {
          connection.release();
  
          if (err) {
            console.error(err);
            res.status(500).send('Error updating CPF record.');
          } else {
            res.status(200).send('CPF record updated successfully.');
          }
        }
      );
    });
  });
  app.delete('/cpf-delete/:cpf_id', (req, res) => {
    const { cpf_id } = req.params;
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database.');
        return;
      }
  
      connection.query(
        'DELETE FROM cpf WHERE cpf_id = ?',
        cpf_id,
        (err, result) => {
          connection.release();
  
          if (err) {
            console.error(err);
            res.status(500).send('Error deleting CPF record.');
          } else {
            res.status(200).send('CPF record deleted successfully.');
          }
        }
      );
    });
  });
  app.get('/cpf-information', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database.');
        return;
      }
  
      connection.query('SELECT * FROM cpf', (err, results) => {
        connection.release();
  
        if (err) {
          console.error(err);
          res.status(500).send('Error retrieving CPF records.');
        } else {
          res.status(200).json(results);
        }
      });
    });
  });
        


  app.post('/allowance', (req, res) => {
    const { allowance_name, allowance_rate, create_user } = req.body;
  
    const query = `INSERT INTO allowance (allowance_name, allowance_rate, create_user, create_datetime) VALUES (?, ?, ?, NOW())`;
    const values = [allowance_name, allowance_rate, create_user];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error saving allowance:', error);
        res.status(500).json({ error: 'Error saving allowance information.' });
      } else {
        res.status(200).json({ message: 'Allowance information saved successfully.' });
      }
    });
  });

  app.put('/allowance-put/:id', (req, res) => {
    const allowanceId = req.params.id;
    const { allowance_name, allowance_rate } = req.body;
  
    const query = `UPDATE allowance SET allowance_name = ?, allowance_rate = ? WHERE id = ?`;
    const values = [allowance_name, allowance_rate, allowanceId];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating allowance:', error);
        res.status(500).json({ error: 'Error updating allowance information.' });
      } else {
        res.status(200).json({ message: 'Allowance information updated successfully.' });
      }
    });
  });

  app.delete('/allowance-delete/:id', (req, res) => {
    const allowanceId = req.params.id;
  
    const query = `DELETE FROM allowance WHERE id = ?`;
    const values = [allowanceId];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error deleting allowance:', error);
        res.status(500).json({ error: 'Error deleting allowance.' });
      } else {
        res.status(200).json({ message: 'Allowance deleted successfully.' });
      }
    });
  });

  app.get('/allowance-get/:id', (req, res) => {
    const allowanceId = req.params.id;
  
    const query = `SELECT * FROM allowance WHERE id = ?`;
    const values = [allowanceId];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error retrieving allowance:', error);
        res.status(500).json({ error: 'Error retrieving allowance.' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Allowance not found.' });
      } else {
        const allowance = results[0];
        res.status(200).json({ allowance });
      }
    });
  });







const swaggerSpec = swaggerJSDoc(swaggerOptions);
  
// Serve Swagger API documentation using Swagger UI Express
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


/**
 * @swagger
 * tags:
 *   name: Employee Information
 *   description: Endpoints for managing the employee information table
 */
/**
 * @swagger
 * tags:
 *   name: File Upload / Download
 *   description: Endpoints for managing file uploads and downloads
 */
/**
 * @swagger
 * tags:
 *    name: Data Retrieval
 *    description: Endpoints for managing data retrieval processes
 */ 

/**
 * @swagger
 * /employee-add:
 *   post:
 *     summary: Add new employee
 *     tags: [Employee Information]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Employee'
 *     responses:
 *       200:
 *         description: Employee information saved successfully.
 *       500:
 *         description: Error saving employee information.
 */


/**
 * @swagger
 * /employee-edit/{id}:
 *   put:
 *     summary: Update employee information
 *     tags: [Employee Information]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to update
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Employee'
 *     responses:
 *       200:
 *         description: Employee information updated successfully.
 *       500:
 *         description: Error updating employee information.
 */


/**
 * @swagger
 * /employee-delete/{id}:
 *   delete:
 *     summary: Delete employee record
 *     tags: [Employee Information]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to delete
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Employee record deleted successfully.
 *       500:
 *         description: Error deleting employee record.
 */


/**
 * @swagger
 * /employee-information:
 *   get:
 *     summary: Get all employee records
 *     tags: [Data Retrieval]
 *     responses:
 *       200:
 *         description: Employee records retrieved successfully.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Employee'
 *       500:
 *         description: Error retrieving employee records.
 *     
 */

/**
 * @swagger
 * definitions:
 *   Employee:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Employee ID
 *       employee_ssid:
 *         type: string
 *         description: Employee SSID
 *       employee_name:
 *         type: string
 *         description: Employee name
 *       employee_gender:
 *         type: string
 *         description: Employee gender
 *       employee_address:
 *         type: string
 *         description: Employee address
 *       employee_mobile:
 *         type: string
 *         description: Employee mobile
 *       employee_home_phone:
 *         type: string
 *         description: Employee home phone
 *       employee_dob:
 *         type: string
 *         format: date
 *         description: Employee date of birth
 *       employee_nat_id:
 *         type: string
 *         description: Employee national ID
 *       employee_natidexpiry:
 *         type: string
 *         format: date
 *         description: Employee national ID expiry date
 *       employee_race:
 *         type: string
 *         description: Employee race
 *       employee_nationality:
 *         type: string
 *         description: Employee nationality
 *       employee_basic_salary:
 *         type: number
 *         format: float
 *         description: Employee basic salary
 *       employee_startdate:
 *         type: string
 *         format: date
 *         description: Employee start date
 *       employee_emergency_name:
 *         type: string
 *         description: Employee emergency contact name
 *       employee_emergency_phone:
 *         type: string
 *         description: Employee emergency contact phone
 *       employee_perm_add:
 *         type: string
 *         description: Employee permanent address
 *       employee_photo:
 *         type: string
 *         format: binary
 *         description: Employee photo (binary format)
 *       employee_signature:
 *         type: string
 *         format: binary
 *         description: Employee signature (binary format)
 *       create_user:
 *         type: string
 *         default: admin
 *         description: User who created the record
 *       create_datetime:
 *         type: string
 *         format: date-time
 *         description: Date and time when the record was created
 *       version:
 *         type: integer
 *         format: int32
 *         description: Version number of the record
 * 
 */
/**
 * @swagger
 * /upload-excel:
 *   post:
 *     summary: Upload Excel file and store its data into the database
 *     tags: [File Upload / Download]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Excel data stored successfully.
 *       400:
 *         description: No file uploaded.
 *       500:
 *         description: Error storing Excel data into the database.
 */
/**
 * @swagger
 * tags:
 *   name: CPF Details
 *   description: API endpoints for CPF details
 */

/**
 * @swagger
 * /cpf-add:
 *   post:
 *     summary: Add new CPF
 *     tags: [CPF Details]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/CPF'
 *     responses:
 *       200:
 *         description: CPF information saved successfully.
 *       500:
 *         description: Error saving CPF information.
 */

/**
 * @swagger
 * /cpf-edit/{id}:
 *   put:
 *     summary: Update CPF information
 *     tags: [CPF Details]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: CPF ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/CPF'
 *     responses:
 *       200:
 *         description: CPF information updated successfully.
 *       404:
 *         description: CPF not found.
 *       500:
 *         description: Error updating CPF information.
 */

/**
 * @swagger
 * /cpf-delete/{id}:
 *   delete:
 *     summary: Delete CPF record
 *     tags: [CPF Details]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: CPF ID
 *     responses:
 *       200:
 *         description: CPF record deleted successfully.
 *       404:
 *         description: CPF not found.
 *       500:
 *         description: Error deleting CPF record.
 */

/**
 * @swagger
 * /cpf-information:
 *   get:
 *     summary: Get all CPF records
 *     tags: [CPF Details]
 *     responses:
 *       200:
 *         description: CPF records retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/CPF'
 *       500:
 *         description: Error retrieving CPF records.
 */
/**
 * @swagger
 * tags:
 *   name: Allowance Table
 *   description: API endpoints for Allowance Table
 */

/**
 * @swagger
 * definitions:
 *   Allowance:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       allowance_name:
 *         type: string
 *       allowance_rate:
 *         type: number
 *         format: float
 *       create_user:
 *         type: string
 *         maxLength: 250
 *       create_datetime:
 *         type: string
 *         format: date-time
 *       version:
 *         type: integer
 *     required:
 *       - id
 *       - allowance_name
 *       - allowance_rate
 *       - create_user
 *       - create_datetime
 *       - version
 */

/**
 * @swagger
 * /allowance:
 *   post:
 *     summary: Add new allowance
 *     tags: [Allowance Table]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Allowance'
 *     responses:
 *       200:
 *         description: Allowance added successfully
 *       500:
 *         description: Error adding allowance
 */
/**
 * @swagger
 * /allowance-put/:id:
 *   put:
 *     summary: Update an existing allowance
 *     tags: [Allowance Table]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the allowance
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Allowance'
 *     responses:
 *       200:
 *         description: Allowance updated successfully
 *       404:
 *         description: Allowance not found
 *       500:
 *         description: Error updating allowance
 */
/** 
 * @swagger
 * /allowance-delete/:id:
 *   delete:
 *     summary: Delete an existing allowance
 *     tags: [Allowance Table]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the allowance
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Allowance deleted successfully
 *       404:
 *         description: Allowance not found
 *       500:
 *         description: Error deleting allowance
 */
/**
 * @swagger
 * /allowance-get/:id:
 *   get:
 *     summary: Get allowance by ID
 *     tags: [Allowance Table]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the allowance
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Allowance found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Allowance'
 *       404:
 *         description: Allowance not found
 *       500:
 *         description: Error retrieving allowance
 */

