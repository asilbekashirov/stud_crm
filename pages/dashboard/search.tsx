import { universities } from "@/demo/universities"
import { useState } from "react"
import {motion} from 'framer-motion'
import UniversityDescriptoinCard from "@/components/universityDescription/UniversityDescriptionCard"

const SearchPage = () => {


    return (
        <div>
            <input className="" placeholder="Search..." />
            {
                universities.map((item) => {
                    return (
                        <UniversityDescriptoinCard key={item.name} {...item} />
                    )
                })
            }
        </div>
    )
}

export default SearchPage