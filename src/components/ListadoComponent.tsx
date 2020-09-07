import React, {useContext, useState} from 'react';
import {DataContext} from "./App";
import {FaEdit, RiDeleteBin6Line} from "react-icons/all";
import ReactTable from 'odin-addons/ui/ReactTable';

const ListadoComponente = (props) => {

    const dataContext = useContext(DataContext);

    const getColumns = () => {
        return [{
            Header: <div style={{textAlign: "center"}}>Nombre</div>,
            accessor: 'name',
            sortable: true,
        }, {
            Header: <div style={{textAlign: "center"}}>Apellido</div>,
            accessor: 'lastName',
            sortable: true,
        }, {
            Header: <div style={{textAlign: "center"}}>Email</div>,
            accessor: 'email',
            sortable: true,
        }, {
            Header: <div style={{textAlign: "center"}}>Acciones</div>,
            accessor: 'actions',
            sortable: true,
            Cell: row => (
                <>
                    <FaEdit
                        className={'icon-table'}
                        onClick={() => editCLickFormComponent(row.original)}/>
                    <FaEdit
                        className={'icon-table icon-margin-left'}
                        onClick={() => editCLickHookComponent(row.original)}/>
                    <RiDeleteBin6Line
                        className={'icon-table icon-margin-left'}
                        onClick={() => deleteCLick(row.original)}/>
                </>
            ),
            style: {
                textAlign: "center",
            }
        }];
    }

    const editCLickFormComponent = (user) => {
        dataContext.editUser = user
        props.swichTab(1)
    }
    
    const editCLickHookComponent = (user) => {
        dataContext.editUser = user
        props.swichTab(2)
    }

    const deleteCLick = (user) => {
        dataContext.deleteUser(user)
    }

    return (
        <div style={{margin: '20px'}}>
            <br/>
            <ReactTable
                data={dataContext.users}
                columns={getColumns()}
                defaultPageSize={10}
                defaultSorted={[{id: 'name', desc: true}]}
                previousText="Anterior"
                nextText="Siguiente"
                loadingText="Cargando..."
                pageText="Página"
                ofText="de"
                rowsText="filas"
                className="-striped -highlight cashbacks-table"
            />
        </div>
    )
}
export default ListadoComponente 
