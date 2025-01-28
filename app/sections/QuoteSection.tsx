import React from 'react'

function QuoteSection() {
    return (
        <section className="w-full h-screen px-4 sm:px-12 md:px-14 xl:px-44">
            <div className="sticky top-0 w-full h-screen flex justify-center flex-col gap-20">
                <h1 className="text-[clamp(80px,12vw,80pt)] font-black leading-[1]">
                    Making new things is how you become a leader.
                </h1>
                <p className="text-[20pt] font-bold">Steve Jobs</p>
            </div>
        </section >
    )
}

export default QuoteSection