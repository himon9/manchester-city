import React,{useEffect,useState} from "react";
import AdminLayout from '../../../Hoc/AdminLayout'
import FileUpload from "../../Utils/fileUploader";
import {useFormik } from 'formik'
import * as Yup from 'yup'

import { showErrorToast,showSuccessToast,textErrorHelper,selectErrorHelper,selectIsError } from "../../Utils/tools";
import { TextField,Select,MenuItem,FormControl,Button } from "@mui/material";
import { playersCollection,firebase } from "../../../firebase";

import {  useParams , useNavigate } from "react-router";


const defaultValues = {
    name:'',
    lastname:'',
    number:'',
    position:'',
    image:''
}
const AddEditPlayers = (props) => {
    
    const [loading,setLoading] = useState(false);
    const [formType,setFormType]=useState('')
    const [values,setValues]=useState(defaultValues)
    const [defaultImg,setDefaultImg]=useState('')

    const {playerid}=useParams()
    const formik =useFormik({
        enableReinitialize:true,
        initialValues:values,
        validationSchema:Yup.object({
            name:Yup.string()
            .required('The input is required'),
            lastname:Yup.string()
            .required('This input is required'),
            number:Yup.number()
            .required('The input is required')
            .min(0,'The minimum is zero')
            .max(100,'The max is 100'),
            position:Yup.string()
            .required('This input is required'),
            image:Yup.string()
            .required('The input is required')
        }),
        onSubmit:(values) => {
            submitForm(values)
        }
    })
    
    let myNavigate = useNavigate()
    const navigate = (path) => {
        myNavigate(path)
    }
        
    const submitForm= (values) => {

        let dataToSubmit=values;
        setLoading(true)
        if (formType ==='add'){
            playersCollection.add(dataToSubmit)
            .then(()=>{
                showSuccessToast("Player Added!")
                formik.resetForm();
                navigate('/admin_players')
                
            }).catch(error=>{
                showErrorToast(error)
            })
        } else {
            playersCollection.doc(playerid).update(dataToSubmit)
            .then(()=>{
                showSuccessToast('Player Updated!')
            }).catch(error=>{
                showErrorToast(error)
            }).finally(()=>{
                setLoading(false)
            })
        }
    }   




    useEffect (()=>{
        
        //const param=props.match.params.playerid
        if(playerid){
            console.log(playerid)

            playersCollection.doc(playerid).get().then(snapshot => {
                if (snapshot.data()) {

                    firebase.storage().ref('players')
                    .child(snapshot.data().image).getDownloadURL()
                    .then(url=>{
                        updateImageName(snapshot.data().image)
                        setDefaultImg(url)
                    })
                    setFormType('edit')
                    console.log(snapshot.data())
                    setValues(snapshot.data())
                    console.log(values)
                } else {
                    showErrorToast('Sorry,nothing was found!')
                }
            }).catch(error=>{
                showErrorToast(error)
            })
        } else {
            setFormType('add')
            setValues(defaultValues)
        }
    },[playerid])

    const updateImageName = (filename) => {
        formik.setFieldValue('image',filename)
    }

    const resetImage = () => {
        formik.setFieldValue('image','');
        setDefaultImg('')
    }

    /*
    return(
        
        <AdminLayout title={formType === 'add'? 'Add player':'Edit player'} >
            <div className="editplayers_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FileUpload
                                dir='players'
                                defaultImgName={formik.values.image}
                                defaultImg={defaultImg}//image url
                                filename={(filename)=>{
                                    updateImageName(filename)
                                }}
                            />
                        </FormControl>

                        
                        <hr/>
                        <h4>Player info</h4>
                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="name"
                                    name="name"
                                    variant="outlined"
                                    placeholder="Add firstname"
                                    {...formik.getFieldProps('name')}
                                    {...textErrorHelper(formik,'name')}
                                />
                            
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="lastname"
                                    name="lastname"
                                    variant="outlined"
                                    placeholder="Add lastname"
                                    {...formik.getFieldProps('lastname')}
                                    {...textErrorHelper(formik,'lastname')}
                                />
                            
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    type='number'//ERRRROORR!!!!! user is able to input alphabets in the field
                                    id="number"
                                    name="number"
                                    variant="outlined"
                                    placeholder="Add number"
                                    {...formik.getFieldProps('number')}
                                    {...textErrorHelper(formik,'number')}
                                />
                            
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl error={selectIsError(formik,'position')}>
                                <Select
                                    id="position"
                                    name="position"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('position')}
                                >
                                    <MenuItem value="" disabled>Select a position</MenuItem>
                                    <MenuItem value="Keeper">Keeper</MenuItem>
                                    <MenuItem value="Defence">Defence</MenuItem>
                                    <MenuItem value="Midfield">Midfield</MenuItem>
                                    <MenuItem value="Striker">Striker</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'position')}
                            </FormControl>
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            { formType === 'add' ?
                                'Add player'
                            :
                                'Edit player'
                            }
                        </Button>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )*/

    return(
        <AdminLayout title={formType === 'add'? 'Add player':'Edit player'} >
            <div className="editplayers_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>

                        <FormControl  error={selectIsError(formik,'image')}>
                            <FileUpload
                                dir="players"
                                defaultImg={defaultImg} /// image url
                                defaultImgName={formik.values.image} /// name of file
                                filename={(filename)=> updateImageName(filename)}
                                resetImage={()=> resetImage()}
                            />
                             {selectErrorHelper(formik,'image')}
                        </FormControl>
                        

                        <hr/>
                        <h4>Player info</h4>
                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="name"
                                    name="name"
                                    variant="outlined"
                                    placeholder="Add firstname"
                                    {...formik.getFieldProps('name')}
                                    {...textErrorHelper(formik,'name')}
                                />
                            
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="lastname"
                                    name="lastname"
                                    variant="outlined"
                                    placeholder="Add lastname"
                                    {...formik.getFieldProps('lastname')}
                                    {...textErrorHelper(formik,'lastname')}
                                />
                            
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    type="number"
                                    id="number"
                                    name="number"
                                    variant="outlined"
                                    placeholder="Add number"
                                    {...formik.getFieldProps('number')}
                                    {...textErrorHelper(formik,'number')}
                                />
                            
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl error={selectIsError(formik,'position')}>
                                <Select
                                    id="position"
                                    name="position"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('position')}
                                >
                                    <MenuItem value="" disabled>Select a position</MenuItem>
                                    <MenuItem value="Keeper">Keeper</MenuItem>
                                    <MenuItem value="Defence">Defence</MenuItem>
                                    <MenuItem value="Midfield">Midfield</MenuItem>
                                    <MenuItem value="Striker">Striker</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'position')}
                            </FormControl>
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            { formType === 'add' ?
                                'Add player'
                            :
                                'Edit player'
                            }
                        </Button>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}





export default AddEditPlayers