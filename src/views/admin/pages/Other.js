import React, {useEffect, useState} from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CProgress,
    CRow,
    CSpinner,
    CCardHeader,
    CCollapse,
    CInputFile,
    CInvalidFeedback, CLabel, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CInput, CTextarea
} from '@coreui/react'
import './pages.scss'
import '../../../scss/shared.css'
import {getFirebase} from "../../../components/Firebase/firebase";
import {FaPen, FaInfoCircle} from 'react-icons/fa';


const Other = (props) => {
    const [image, setImage] = useState(null);
    // const [imageUrl, setImageUrl] = useState('');
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [page, setPage] = useState([]);
    const [progress, setProgress] = useState(0);
    // const inputFileRef = [useRef( null )];
    const [updateModal, setUpdateModal] = useState( false);

    useEffect(() => {
        if (props.match.params.page) {
            const pageRef = getFirebase().database().ref('pages/'+props.match.params.page);
            pageRef.on('value', (snapshot) => {
                let items = snapshot.val();
                setPage([items]);
                // setPage([
                //     {section: 'top', content: structureFetchedData(items.top)},
                //     {section: 'about', content: structureFetchedData(items.about)},
                //     {section: 'checkOutMyBooks', content: structureFetchedData(items.checkOutMyBooks)},
                //     {section: 'extraMe', content: structureFetchedData(items.extraMe)}
                // ]);
            });
        }

}, []);

    function structureFetchedData(data) {
        let val = [];
        for (let item in data) {
            val.push({
                id: item,
                title: data[item].title,
                // imageUrl: data[item].imageUrl,
                content: data[item].content
            });
        }
        return val
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newPostRef = getFirebase().database().ref('pages/'+props.match.params.page);
        // let file = image;
        // const storage = getFirebase().storage();
        // const storageRef = storage.ref();

        // if (image) {
            // const uploadTask = storageRef.child('pages/' + file.name).put(file);
            // uploadTask.on(getFirebase().storage.TaskEvent.STATE_CHANGED,
            //     (snapshot) =>{
            //         const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 80;
            //         setProgress(10 + uploadProgress)
            //     },(error) =>{
            //         throw error
            //     },() =>{
            //         uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
            //             const newPost = {
            //                 title: title,
            //                 imageUrl: url,
            //                 date: new Date(),
            //                 content: content
            //             };
            //             newPostRef.update(newPost).then(()=>{
            //                 setProgress(100);
            //                 setUpdateModal(false);
            //                 setTitle('');
            //                 setImageUrl('');
            //                 setImage(null);
            //                 setContent('');
            //                 setId('');
            //
            //             });
            //
            //         });
            //     }
            // )
        // } else {
                        const newPost = {
                            title: title,
                            // imageUrl: imageUrl,
                            date: new Date(),
                            content: content
                        };
                        newPostRef.update(newPost).then(()=>{
                            setProgress(100);
                            setUpdateModal(false);
                            setTitle('');
                            // setImageUrl('');
                            // setImage(null);
                            setContent('');
                            setId('');

                        });
        // }


    }
    return (
        <>
            <CModal
                show={updateModal}
                size="lg"
                onClose={setUpdateModal.bind(this, false)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>{title}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {/*<div className={" col-lg-6 d-flex align-items-center mx-auto "} style={{flexDirection: 'column', }}>*/}
                    {/*    {imageUrl.trim().length > 0 ?*/}
                    {/*        <img src={imageUrl} alt=""  style={{maxWidth: "100%", maxHeight: "320px"}}/>*/}
                    {/*        : <h1 className="text-dark my-4 text-center">*/}
                    {/*            <FaInfoCircle fontSize="1.5em" className="  mb-3 mx-4"/>*/}
                    {/*            No Image*/}
                    {/*        </h1>*/}
                    {/*    }*/}
                    {/*    <input type="file" id="file" hidden name="image" placeholder="Image"*/}
                    {/*           ref={inputFileRef} onChange={event => {*/}
                    {/*               if (event.target.files[0]) {*/}
                    {/*                   setImage(event.target.files[0]);*/}
                    {/*                   setImageUrl(URL.createObjectURL(event.target.files[0]));*/}
                    {/*               }*/}
                    {/*    }}/>*/}
                    {/*    <button type="submit" onClick={() => inputFileRef.current.click()} className="btn sec-main-bg h3 font-subheading text-white px-4 py-2 my-3 mx-auto">Select Image</button>*/}
                    {/*</div>*/}
                    <div className="col-lg-11 h3 mx-auto">
                            <div className="form-group ">
                                Title
                                <CInput type="text" className="p-4 h3 border" name="title" placeholder="Title" onChange={event => setTitle(event.target.value)} value={title}/>
                            </div>
                        <div className="form-group">
                            Details
                            <CTextarea className="h3 p-4 rounded-lg" rows="4" name="content"  placeholder="Post Content"  onChange={event => setContent(event.target.value)} value={content}/>
                        </div>
                        <div className="row ">
                            <button type="submit" onClick={setUpdateModal.bind(this, false)}
                                    className="btn row align-items-center main-bg font-subheading h3 text-white px-4 ml-auto mr-4">
                                <span className={"px-4 py-2"}>Cancel</span>
                            </button>
                            <button type="submit" onClick={handleSubmit} disabled={progress > 0 && progress < 100}
                                    className="btn row align-items-center sec-main-bg font-subheading h3 text-white px-4 mr-auto ml-4">
                                {progress > 0 && progress < 100 ? <CSpinner color="info" className={""}/> : ''}
                                <span className={"px-4 py-2"}>Update</span>
                            </button>
                        </div>
                    </div>
                </CModalBody>
            </CModal>



            {page.map((section, index) => (
                <div key={section.id} className="pb-5 col-xxl-10 mx-auto">
                    <div className=" d-flex m-0 align-items-center justify-content-center justify-content-md-start px-0">
                        <h2 className="col-10 font-banner ml-2 ml-lg-5">{section.title}</h2>
                        <div className=" my-2 ml-auto mr-3">
                            <CButton color="light" className="col quote-card" style={{width: '4.7em'}}
                                     onClick={event => {
                                         setId(section.id);
                                         setTitle(section.title);
                                         setContent(section.content);
                                         // setImageUrl(section.imageUrl);
                                         setUpdateModal(true);
                                     }}>
                                                  <span>
                                                      <FaPen fontSize="2em" className="bg-success rounded-circle px-2 m-1"/>
                                                  </span><br/>Edit
                            </CButton>
                        </div>
                    </div>

                    <CProgress
                        className="progress-xs mt-0"
                        precision={1}
                        color="primary"
                        value={progress}
                        animated={progress !== 100}
                    />
                    <div>
                        <div className={"row px-0 m-0 px-md-2 py-2 py-lg-5 mx-auto"}>
                            {/*<div className={" col-lg-5 d-flex align-items-center"} style={{flexDirection: 'column', }}>*/}
                            {/*    {section.imageUrl.trim().length > 0 ?*/}
                            {/*        <img src={section.imageUrl} alt=""  style={{maxWidth: "100%", maxHeight: "320px"}}/>*/}
                            {/*        : <h1 className="text-dark my-auto text-center">*/}
                            {/*            <FaInfoCircle fontSize="1.5em" className="  mb-3 mx-4"/>*/}
                            {/*            No Image*/}
                            {/*        </h1>*/}
                            {/*    }*/}
                            {/*</div>*/}
                            <div className={"col-lg-10"}>
                                <div className="form-group ">
                                    <p>Title</p>
                                    <p className="bg-white text-dark rounded-lg p-4">{section.title}</p>
                                </div>
                                <div className="form-group">
                                    <p>Details</p>
                                    <p className="bg-white text-dark rounded-lg p-4">{section.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </>
    )
}

export default Other;
