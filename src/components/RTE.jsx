import React from 'react'
import { Controller } from 'react-hook-form'
import {Editor } from '@tinymce/tinymce-react';
function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className="inline-block mb-1 pl-1" htmlFor={name}>{label}</label>}
            <Controller
                name={name || "content "}
                control={control}
                render={({ field: { onchange } }) =>
                    <Editor
                        initialValue={defaultValue}
                        branding={false}
                        menubar = 'file edit view'
                        apiKey='srkq9llnonu574jwv9b9cfrkp0lra6lhxt6w0eiie2akvlsl'
                        init={{
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            content_style: "p { color: red } body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }"
                        }}

                        onEditorChange={onchange}
                    />
                }

            />


        </div>
    )
}

export default RTE




//control will transfer this editor or input state into our form that we will be  using in parent
//content_style we can write valid css