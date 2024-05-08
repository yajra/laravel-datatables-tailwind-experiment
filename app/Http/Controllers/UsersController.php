<?php

namespace App\Http\Controllers;

use App\DataTables\UsersDataTable;
use App\DataTables\UsersDataTableEditor;
use Illuminate\Http\JsonResponse;

class UsersController extends Controller
{
    public function index(UsersDataTable $dataTable)
    {
        return $dataTable->render('users.index');
    }

    /**
     * @throws \Yajra\DataTables\DataTablesEditorException
     */
    public function store(UsersDataTableEditor $editor): JsonResponse
    {
        return $editor->process(request());
    }
}
