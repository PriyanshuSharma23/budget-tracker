import { motion } from "framer-motion";
import {ReactNode} from "react"


type Props = {
    children: ReactNode;
    onClick: () => void;
}

function BackDrop({ children, onClick }:Props) {
    return (
        <motion.div
            className="absolute z-10 bg-gray-900 grid place-items-center bg-opacity-50 w-full h-full left-0 top-0"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
}

export default BackDrop;
