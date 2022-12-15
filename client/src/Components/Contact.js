import React from 'react'
import { useRef , useState} from 'react';
import emailjs from '@emailjs/browser';
import "./Comp.css"
const Contact = () => {
    const form = useRef();
    const [msg, setmsg] = useState(false)
    const [err, seterr] = useState(false)
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_dt8xxsc', 'template_n38ovpm', form.current, 'iPlTOH6PqzJWNT6du')
          .then((result) => {
              console.log(result.text);
              setmsg(true)
          }, (error) => {
              console.log(error.text);
              seterr(true)
          });
      };

  return (
    <div className=''>
        <iframe className="gmap_iframe map" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=675&amp;height=432&amp;hl=en&amp;q=2, Oweh street, Jibowu, Yaba, Yaba 100252, Lagos&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
        <div className='info col-sm-12'>
           <div className='row py-5'>
            <div className='col-sm-6'>
                <div><label><h6>Address:</h6></label> 2, oweh St, Jibowu, Lagos, Nigeria</div>
                <div><label><h6>Tel. Phone:</h6></label> +234 808-157-2379</div>
            </div>
            <div className='col-sm-6'>
                <div><label><h6>Email:</h6></label> Fleekstore@gmail.com</div>
                <div><label><h6>Working Days:</h6></label> Mon - Sat</div>
            </div>
           </div>
        </div>
        <div className='container contact pt-3 text-center m-0 m-auto'>
            <div className=''>
            <h1><span>Contact</span> Form</h1>
            <hr/>
            <form method='post' ref={form} onSubmit={sendEmail}>
            <div className='col-sm-12'>
                <div className='row'>
                    <div className='col-sm-6 form-group'>
                         <input type="text" placeholder='Enter your name' className='form-control' name='name' />
                    </div>
                    <div className='col-sm-6 form-group'>
                         <input type="email" placeholder='Enter your email' className='form-control' name='email' />
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <textarea cols="30" rows="5" className='form-control' placeholder='your message' name='message'></textarea>
            </div>
            <div className='text-left'>
                <button type="submit" className="btn btn-secondary px-5">submit</button>
                {msg && <h5>Sent succesfully</h5>}
                {err && <h5>Oops! please try again</h5>}
            </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Contact