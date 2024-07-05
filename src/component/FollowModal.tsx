
import { useRef, useEffect } from "react";
const TermsModal = (props: any) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const handleMouseClickOutside = (e: any) => {
        if (modalRef && modalRef.current && !modalRef.current.contains(e.target)) {
            props.setIsModalOpen(false);
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleMouseClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleMouseClickOutside);
        }
    }, [props.isModalOpen])
    console.log('---------- ', props)
    const getFollowText = (followType: string) => {
        if (followType === 'Twitter') {
            return 'Follow us on Twitter';
        } else if (followType === 'Telegram') {
            return 'Join our Telegram';
        } else if (followType === 'ETH') {
            return 'Share your ETH wallet';
        } else if (followType === "Email") {
            return 'Share your email'
        } else if (followType === 'Website') {
            return 'Visit our website';
        }
    }

    return (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 border-4 border-[#43E0F7] rounded-xl bg-[#CBEFF9] w-[95vw] font-press-start" ref={modalRef}>
            <div className="relative rounded-lg">
                <div className="p-4 md:p-5 font-press-start text-black">
                    {getFollowText(props.followType)}
                </div>
                <div className={`mt-6 ${(props.followType === 'Telegram' || props.followType === 'Website') && 'hidden' }`}>
                    <input className='rounded-md text-[24px] w-[80vw] outline-[#43E0F7]'></input>
                </div>
                <button className='mt-4 w-[80vw] rounded-full text-[#43E0F7] text-[16px] p-1 bg-black' onClick={() => props.setIsModalOpen(false)}>Verify</button>
            </div>
        </div>
    );
};

export default TermsModal;
