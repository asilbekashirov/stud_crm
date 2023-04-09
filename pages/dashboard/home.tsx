const HomePage = () => {
    return (
        <div className="flex flex-col">
            <div className="w-full h-80 rounded-xl bg-slate-200 flex justify-center items-center">
                Main news here...
            </div>
            <div className="w-full flex justify-between gap-3 mt-3">
                <div className="w-full h-80 rounded-xl bg-slate-200 flex justify-center items-center">
                    News archive...
                </div>
                <div className="w-full h-80 rounded-xl bg-slate-200 flex justify-center items-center">
                    To do something...
                </div>
            </div>
        </div>
    )
}

export default HomePage