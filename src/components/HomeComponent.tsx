import React, {useRef, useState} from 'react';
import {Tabs, Tab, TabContent} from '@andes/tabs';
import FormComponent from "./FormComponent";
import FormHook from "./FormHook";
import ListadoComponente from "./ListadoComponent";

const HomeComponente = (props) => {

    const tab = useRef({} as Tab);

    const swichTab = (index) => {
        tab.current.setSelectedTabAndUpdateSlider(index, true);
    }

    return (
        <div>
            <Tabs className="tabs" ref={tab}>
                <Tab title="Listado">
                    <ListadoComponente swichTab={swichTab}/> 
                </Tab>
                <Tab title="Formulario con State">
                    <FormComponent swichTab={swichTab}/>
                </Tab>
                <Tab title="Formulario con Hook">
                    <FormHook swichTab={swichTab}/>
                </Tab>
            </Tabs>
        </div>
    )
}
export default HomeComponente 
