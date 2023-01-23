import { SUCCESS_HTTP_CODE_CREATED } from "application/common";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { initPersonal } from "application/models/personal";
import { personal_interface } from "infrastructure/api/personal";
import { user_interface } from "infrastructure/api/users";
import Input from "infrastructure/components/input";
import Select from "infrastructure/components/select";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { CreatePersonalProps } from "presentation/container/personal/create-container";
import { DetailPersonalProps } from "presentation/container/personal/detail-container";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SelectReact from 'react-select';


const DetailPersonal = (props: DetailPersonalProps) => {
    useTitle(props.title);
    useBreadcrumbs(props.breadcrumbs);

    let navigate = useNavigate()


    let { id } = useParams();

    const [message, setMessage] = useState<ToastProps>({
        type: "info",
        visible: false,
        title: "",
        description: "",
    });
    const [users, setUsers] = useState<user_interface.User[]>([])


    const [form, setForm] = useState<personal_interface.Personal>(initPersonal);




    //create array with fields name, type, label, options and value
    const fields = [

        {
            name: "name",
            type: "text",
            label: "Nombre",
            options: [],
            value: form.firstName,
        },
        {
            name: "lastname1",
            type: "text",
            label: "Apellido",
            options: [],
            value: form.firstSurname,
        },

        {
            name: "documentType",
            type: "text",
            label: "Tipo de documento",
            options: [
                { label: 'DNI', value: 'DNI' },
                { label: 'Otro', value: 'Otro' }
            ],
            value: form.documentType.name,
        },

        {
            name: "document",
            type: "text",
            label: "Documento",
            options: [],
            value: form.documentValue,
        },

        {
            name: "country",
            type: "text",
            label: "País",
            options: [],
            value: form.country.name,
        },

        {
            name: "direction",
            type: "text",
            label: "Dirección",
            options: [],
            value: form.direction,
        },

        {
            name: "location",
            type: "text",
            label: "Localidad",
            options: [],
            value: form.location,
        },
        {
            name: "email",
            type: "text",
            label: "Email",
            options: [],
            value: form.email,
        },
        {
            name: "mobilePhone",
            type: "text",
            label: "Teléfono móvil",
            options: [],
            value: form.mobilePhone,
        },
        {
            name: "phone",
            type: "text",
            label: "Teléfono",
            options: [],
            value: form.mobilePhone,
        },
        {
            name: "postalCode",
            type: "text",
            label: "Código postal",
            options: [],
            value: form.postalCode,
        },
        {
            name: "province",
            type: "text",
            label: "Provincia",
            options: [],
            value: form.province,
        },
        {
            name: "type",
            type: "text",
            label: "Tipo",
            options: [
                { label: 'interno', value: 'interno' },
                { label: 'externo', value: 'externo' },

            ],
            value: "interno",
        },

        {
            name: "contact",
            type: "text",
            label: "Contacto",
            options: [],
            value: "",
        },
        {

            name: "contact2",
            type: "text",
            label: "Contacto 2",
            options: [],
            value: "",
        },
        {
            name: "contactSchedule",
            type: "text",
            label: "Horario de contacto",
            options: [],
            value: form.contactSchedule,
        },


    ];


    useEffect(() => {

        setForm(props.GetPersonalById.data.message)

    }, [props.GetPersonalById]);



    useEffect(() => {
        props.onGetPersonalByIdAsync({
            headers: {
                token: props.token
            },
            id: id as string
        })
    }, [])



    const handleChange = (
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };


    return (
        <section id="basic-vertical-layouts">
            <div className="col-12 row bg-cover">
                <div className="row p-2 col-12">
                    {
                        //create fields from form
                        fields.map((field, index) => {

                            return (
                                <div className="col-12 col-md-6" key={index}>
                                    <Input
                                        name={field.name}
                                        type={field.type}
                                        label={field.label}
                                        value={field.value}
                                        enabled={true}
                                    />
                                </div>
                            )


                        })


                    }

                </div>
                <div className="col-12 row ">
                    <div className="col-12 justify-content-end d-md-flex ">
                        <Link
                            type="button"
                            className="btn btn-lg btn-outline-dark m-2"
                            to={`/inicio/usuarios/`}
                        >
                            Atrás
                        </Link>

                    </div>
                </div>
            </div>
            <div className="toast-bs-container">
                <Toast {...message} />
            </div>
        </section>
    );
};

export default DetailPersonal;
