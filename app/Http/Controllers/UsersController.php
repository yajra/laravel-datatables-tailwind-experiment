<?php

namespace App\Http\Controllers;

use App\DataTables\UsersDataTable;

class UsersController extends Controller
{
    public function __invoke(UsersDataTable $dataTable)
    {
        return $dataTable->render('users.index');
    }
}
