# Laravel DataTables with TailwindCSS Experiment

This is a simple project to experiment with Laravel DataTables and TailwindCSS.

## Requirements

You need to have `DataTables Editor (JS) 2.3.2` installed. Download the zip file from the [DataTables Editor website](https://editor.datatables.net/download/) and save it in the `project` folder.

## Installation

1. Clone the repository and set up the `.env` file
  - Run `cp .env.example .env`
  - Set up the database connection in the `.env` file 
  - Set up the `APP_KEY` by running `php artisan key:generate`
2. Run `composer install`
3. Run `npm install`
4. Run `npm run dev`
5. Run `php artisan migrate`
6. Run `php artisan db:seed`
7. Run `php artisan serve`
8. Visit `http://localhost:8000` in your browser
9. Login with the following credentials:
    - Email: `admin@example.com`
    - Password: `password`
10. Visit `http://localhost:8000/users` in your browser

## License

This project is open-sourced software licensed under the [DBAD license](https://dbad-license.org/).
