import React from "react";
import { useForm } from "react-hook-form";

function App() {
    const{
        register,
        handlesubmit,
        fromState : {errors}
    } = useForm();
    const onSubmit = (data) => {
        console.log
    }
} 

return(
    <div>
        <form onSubmit={handlesubmit(onsubmit)}>
            <div>
                <label htmlFor="firstname">First Name</label>
                <input
                name="ชื่อจริง"
                placeholder="รณจักร"
                {...register("firstname",{required:true})}
                />
                {errors.firstName && <p>บังคับกรอกช้อมูล</p>}
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    name="นามสกุล"
                    placeholder="จุฑาเทพ"
                    {...register("lastName", { required: true })}
                />
                {errors.lastName && <p>บังคับกรอกช้อมูล</p>}
            </div>
            <div>
                <label htmlFor="Age">Last Name</label>
                <input
                    name="อายุ"
                    placeholder="20"
                    {...register("Age", { required: true })}
                />
                {errors.Age && <p>บังคับกรอกช้อมูล</p>}
            </div>
            <div>
                <label htmlFor="Listeninglevel">Listening Level</label>
                <select name="ระดับการได้ยิน">
                    <option value="หูดี">good</option>
                    <option value="หูตึง">impaired</option>
                    <option value="หูหนวก">deaf</option>
                </select>
            </div>
        </form>
    </div>
)