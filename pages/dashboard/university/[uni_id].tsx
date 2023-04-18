import { universities } from "@/demo/universities"
import { Icon } from "@iconify/react"
import { useRouter } from "next/router"

const UniversityDetailPage = () => {

    const router = useRouter()
    const universityInfo = universities.find(u => u.name === router.query.uni_id)

    return (
        <main className="">
            <div className="w-full h-60">
                <img className="w-full h-full object-cover" src={universityInfo?.image} alt={universityInfo?.name} />
            </div>
            <h2 className="text-3xl mt-4 font-semibold">{universityInfo?.name}</h2>
            <h5 className="flex items-center text-gray-700 text-lg mt-2">
                <Icon icon="mdi:location-outline" width={25} color="#555" />
                {universityInfo?.country},&nbsp;{universityInfo?.city}
            </h5>
            <h4 className="text-xl font-semibold mt-5">University info:</h4>
            <p className="mt-2">{universityInfo?.description}</p>
            <h4 className="text-xl font-semibold mt-5">Available courses</h4>
            <h6 className="text-lg mt-2">BSc:</h6>
            <div className="flex flex-col">
                {
                    Array.from({length: 5}).map((_, i) => (
                        <div key={i} className="w-full p-2 flex flex-col justify-start bg-slate-100 border border-gray-400 border-solid rounded-md mt-2">
                            <h4 className="text-gray-600 text-lg">Course title</h4>
                            <div className="mt-1 flex items-center">
                                <Icon color="#444" className="mr-1" icon="mdi:translate" width={20} />
                                English / French / Italian
                            </div>
                            <div className="mt-1 flex items-center">
                                <Icon color="#444" className="mr-1" icon="mdi:calendar-month-outline" width={20} />
                                3 years / 6 semesters
                            </div>
                            <div className="mt-1 flex items-center">
                                <Icon color="#444" className="mr-1" icon="mdi:clock-outline" width={20} />
                                Full-time / Part-time
                            </div>
                        </div>
                    ))
                }
            </div>
            <h6 className="text-lg mt-2">MSc:</h6>
            <div className="flex flex-col">
                {
                    Array.from({length: 3}).map((_, i) => (
                        <div key={i} className="w-full p-2 flex flex-col justify-start bg-slate-100 border border-gray-400 border-solid rounded-md mt-2">
                            <h4 className="text-gray-600 text-lg">Course title</h4>
                            <div className="mt-1 flex items-center">
                                <Icon color="#444" className="mr-1" icon="mdi:translate" width={20} />
                                English / French / Italian
                            </div>
                            <div className="mt-1 flex items-center">
                                <Icon color="#444" className="mr-1" icon="mdi:calendar-month-outline" width={20} />
                                3 years / 6 semesters
                            </div>
                            <div className="mt-1 flex items-center">
                                <Icon color="#444" className="mr-1" icon="mdi:clock-outline" width={20} />
                                Full-time / Part-time
                            </div>
                        </div>
                    ))
                }
            </div>
            <h6 className="text-lg mt-2">Phd:</h6>
            <div className="flex flex-col">
                {
                    Array.from({length: 2}).map((_, i) => (
                        <div key={i} className="w-full p-2 flex flex-col justify-start bg-slate-100 border border-gray-400 border-solid rounded-md mt-2">
                            <h4 className="text-gray-600 text-lg">Course title</h4>
                            <div className="mt-1 flex items-center">
                                <Icon color="#444" className="mr-1" icon="mdi:translate" width={20} />
                                English / French / Italian
                            </div>
                            <div className="mt-1 flex items-center">
                                <Icon color="#444" className="mr-1" icon="mdi:calendar-month-outline" width={20} />
                                3 years / 6 semesters
                            </div>
                            <div className="mt-1 flex items-center">
                                <Icon color="#444" className="mr-1" icon="mdi:clock-outline" width={20} />
                                Full-time / Part-time
                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export default UniversityDetailPage