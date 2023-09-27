import { useState } from 'react';
import { submitRegistration } from './formUtils';
// This is a custom hook that we can use to manage the state of the form
const useRegistrationForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [car, setCar] = useState("No");
    const [seats, setSeats] = useState(0);

    // This is the function that will be called when the form is submitted
    const submitHandler = (e : any) => {
        e.preventDefault();
        console.log("form submitted");
        submitRegistration({name, email, phone, car, seats});
        // Handle the form submission logic here
      };

    return {
        name,
        setName, 
        email,
        setEmail,
        phone,
        setPhone,
        car,
        setCar,
        seats,
        setSeats,
        submitHandler,
    }
}

export default useRegistrationForm;