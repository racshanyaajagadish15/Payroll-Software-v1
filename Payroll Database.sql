DROP DATABASE IF EXISTS `payroll database`;
CREATE DATABASE `payroll database`;
DROP TABLE IF EXISTS `payroll database`.`employee_information` ;

CREATE TABLE IF NOT EXISTS `payroll database`.`employee_information` (
  `id` INT UNSIGNED NOT NULL,
  `employee_ssid` VARCHAR(45) NOT NULL,
  `employee_name` VARCHAR(250) NOT NULL,
  `employee_gender` VARCHAR(250) NOT NULL,
  `employee_address` VARCHAR(500) NOT NULL,
  `employee_mobile` VARCHAR(15) NOT NULL,
  `employee_home_phone` VARCHAR(15) NOT NULL,
  `employee_dob` DATE NOT NULL,
  `employee_nat_id` VARCHAR(15) NOT NULL,
  `employee_natidexpiry` DATE NOT NULL,
  `employee_race` VARCHAR(250) NULL,
  `employee_nationality` VARCHAR(250) NULL,
  `employee_basic_salary` FLOAT NOT NULL,
  `employee_startdate` DATE NULL,
  `employee_emergency_name` VARCHAR(250) NULL,
  `employee_emergency_phone` VARCHAR(15) NULL,
  `employee_perm_add` VARCHAR(500) NOT NULL,
  `employee_photo` BLOB NOT NULL,
  `employee_signature` BLOB NOT NULL,
  `create_user` VARCHAR(45) NOT NULL DEFAULT 'admin',
  `create_datetime` DATETIME(6) NOT NULL,
  `version` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `payroll database`.`company_information`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `payroll database`.`company_information` ;

CREATE TABLE IF NOT EXISTS `payroll database`.`company_information` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(250) NOT NULL,
  `company_regno` VARCHAR(10) NOT NULL,
  `company_regdate` DATE NOT NULL,
  `company_entity_type` VARCHAR(250) NOT NULL,
  `company_ssic1` INT(5) NOT NULL,
  `company_ssic2` INT(5) NULL,
  `company_hq_cntry` VARCHAR(250) NOT NULL,
  `company_hqcity` VARCHAR(250) NULL,
  `company_hqadd` VARCHAR(500) NOT NULL,
  `company_address2` VARCHAR(500) NULL,
  `company_address3` VARCHAR(500) NULL,
  `create_user` VARCHAR(45) NOT NULL DEFAULT 'admin',
  `create_datetime` DATETIME(6) NOT NULL,
  `version` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `company_regno_UNIQUE` (`company_regno` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE `payroll_excel_upload` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `employee_ssid` varchar(45) NOT NULL,
  `employee_name` varchar(200) DEFAULT NULL,
  `employee_additional_pay` float NOT NULL,
  `employee_absent_days` float NOT NULL,
  `employee_overtime_hours` float NOT NULL,
  `create_user` varchar(45) NOT NULL DEFAULT 'admin',
  `version` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_ssid_idx` (`employee_ssid`),
  CONSTRAINT `employee_ssid` FOREIGN KEY (`employee_ssid`) REFERENCES `employee_information` (`employee_ssid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cpf` (
  `cpf_id` int unsigned NOT NULL,
  `cpf_age_from` float NOT NULL,
  `cpf_wage_from` float NOT NULL,
  `cpf_age_to` float NOT NULL,
  `cpf_wage_to` float NOT NULL,
  `cpf_employee_share` varchar(200) NOT NULL,
  `cpf_employer_share` varchar(200) NOT NULL,
  `cpf_slab` float NOT NULL,
  `create_user` varchar(45) NOT NULL DEFAULT 'admin',
  `create_datetime` varchar(45) NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`cpf_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `allowances` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `allowance_name` varchar(250) NOT NULL,
  `allowance_rate` float NOT NULL,
  `create_user` varchar(250) NOT NULL DEFAULT 'admin',
  `create_datetime` timestamp(6) NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

