import React from "react";
import ComeAndShare from "../assets/images/come-share.png";
import tile_bg_1 from "../assets/images/come-bg.png";

function HowItWorks() {
    return (
        <div className="lg:px-36 lg:h-screen h-full text-white pb-8 lg:py-16">
            <div className="lg:flex lg:gap-x-20 p-4">
                <div className="flex items-center my-4">
                    <img
                        className="w-[90%] lg:w-[100%]"
                        src={ComeAndShare}
                        alt="come-share.png"
                    />
                </div>
                <div className="relative w-full lg:h-[100%] h-[100%]">
                    <img
                        src={tile_bg_1}
                        className="z-[-10] w-full h-full absolute object-fit"
                    />
                    <div className="text-white h-full flex flex-col items-center justify-center p-6">
                        <p>
                            The CpExpress is an online platform that provides a
                            space for CpE Students to express their opinions,
                            thoughts, and experiences anonymously. The platform
                            operates by allowing users to post messages without
                            revealing their identity. The user-friendly
                            interface provided by the platform enables
                            individuals to submit their content, which is then
                            displayed publicly for others to view and engage
                            with.
                        </p>
                        <p>
                            The anonymous nature of the CpExpress platform
                            provides users with the freedom to express
                            themselves without fear of retribution or judgement.
                            This creates a safe and inclusive space for users to
                            share their opinions and thoughts freely. However,
                            the platform also has measures in place to filter
                            out any inappropriate or vulgar confessions or
                            opinions, ensuring that the messages displayed are
                            appropriate for a public space.
                        </p>
                        <p>
                            The messages posted on the CpExpress platform are
                            accessible to anyone with access to the platform and
                            can be used to start discussions or provide a
                            platform for free speech. Overall, the CpExpress
                            platform provides a space for individuals to express
                            themselves freely, anonymously, and with the
                            assurance that their content will be appropriate for
                            a public audience.
                        </p>
                    </div>
                </div>
                {/* <div className="flex items-center my-4">
                    <img
                        className="lg:w-[90%] w-[100%]"
                        src={HIWMsg}
                        alt="come-share.png"
                    />
                </div> */}
            </div>
        </div>
    );
}

export default HowItWorks;
