/**
 * Serves the login HTML page when a GET request is received.
 * @return {HtmlOutput} The HTML content of the login page.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index.html');
}

/**
 * Checks the provided login credentials against the data in the spreadsheet.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @return {boolean} True if credentials match, false otherwise.
 */
function checkLogin(email, password) {
  // Open the spreadsheet using its ID
  const ss = SpreadsheetApp.openById('YOUR SPREADSHEET ID');
  // Access the specific sheet where credentials are stored
  const sheet = ss.getSheetByName('Credential');
  // Retrieve all data from the sheet
  const data = sheet.getDataRange().getValues();
  
  // Loop through the data to find a matching email and password
  for(let i = 0; i < data.length; i++) {
    if(data[i][0] == email && data[i][1] == password) {
      return true; // Match found
    }
  }
  return false; // No match found
}

/**
 * Retrieves the HTML content for the menu page.
 * @return {HtmlOutput} The HTML content of the menu page.
 */
function getMenuPage() {
  return HtmlService.createHtmlOutputFromFile('menu').getContent();
}

/**
 * Retrieves the HTML content for the registration page.
 * @return {HtmlOutput} The HTML content of the registration page.
 */
function getRegistrationPage() {
  return HtmlService.createHtmlOutputFromFile('registration').getContent();
}

/**
 * Retrieves the HTML content for the login page.
 * @return {HtmlOutput} The HTML content of the login page.
 */
function getLoginPage() {
  return HtmlService.createHtmlOutputFromFile('index').getContent();
}

/**
 * Registers a new user by adding their credentials to the spreadsheet.
 * Throws an error if the user already exists.
 * @param {string} email - The new user's email.
 * @param {string} password - The new user's password.
 */
function registerNewUser(email, password) {
  // Open the spreadsheet using its ID
  const ss = SpreadsheetApp.openById('YOUR SPREADSHEET ID');
  // Access the specific sheet where credentials are stored
  const sheet = ss.getSheetByName('Credential');
  // Retrieve all data from the sheet
  const data = sheet.getDataRange().getValues();

  // Check if the email already exists in the spreadsheet
  for(let i = 0; i < data.length; i++) {
    if(data[i][0] == email) {
      throw new Error('User already exists');
    }
  }
  // Append the new user's email and password to the spreadsheet
  sheet.appendRow([email, password]);
}
