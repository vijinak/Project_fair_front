import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'



function Footer() {
  return (
    <>
     <div className="row w-100 mt-5 p-3 bg-success">
            <div className="col-md-4 p-4 ms-md-5 ">
               <h4 className='text-light '><FontAwesomeIcon icon={faStackOverflow} className='me-2 fs-2' /> Project Fair</h4>
               <p  style={{textAlign:'justify'}} className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore beatae exercitationem incidunt veritatis rerum consequuntur repellendus. A quas quisquam illo doloribus obcaecati dolore sequi, voluptatem quis ratione, rem quos sit! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum rerum corporis fugit, unde et inventore ex, aut saepe expedita ad placeat error optio.</p>

            </div>
            <div className="col-md-2 p-4  justify-content-center d-flex">
                <div>
                    <h4 className='text-light mt-3'>Links</h4>
                    <p className='mt-4'><Link to={'/'} className='text-primary' style={{textDecoration:"none"}}>Home Page</Link></p>
                    <p><Link to={'/project'}  className='text-primary' style={{textDecoration:"none"}}>Project Page</Link></p>
                    <p><Link to={'/dashboard'}  className='text-primary' style={{textDecoration:"none"}}>Dashboard</Link></p>
                    
                </div>
            </div>
            <div className="col-md-2 p-4">
                 <h4 className='text-light mt-3'>Guides</h4>
                 <p className='mt-4'>React</p>
                 <p>Reacct Bootstrap</p>
                 <p>BootWatch</p>

                 
            </div>
            <div className="col-md-3 p-4">
                <h4 className='text-light mt-4'>Contact Us</h4>
                <div className='d-flex mt-4'>
                    <input type="text" className='form-control' placeholder='Email Id' />
                    <button className='btn btn-warning ms-3'>Subscribe</button>
                </div>
                   <div className='d-flex mt-4 justify-content-between'>
                   <FontAwesomeIcon icon={faInstagram} size="2xl" />
                   <FontAwesomeIcon icon={faFacebook} size="2xl" />
                   <FontAwesomeIcon icon={faTwitter} size="2xl" />
                   <FontAwesomeIcon icon={faLinkedin} size="2xl" />
                   </div>
            </div>
            <div className="col-md-1"></div>
        </div>
    </>
  )
}

export default Footer