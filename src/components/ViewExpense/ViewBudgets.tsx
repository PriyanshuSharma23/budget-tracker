import { motion } from "framer-motion";
import { BsFillTrashFill } from "react-icons/bs";
import { useBudget } from "../../contexts/BudgetContext";
import BackDrop from "../Modals/Overlay";

const jumpIn = {
    initial: {
        y: "100vh",
        opacity: 0.5,
    },
    visible: {
        y: 0,
        opacity: 1,
    },
    hidden: {
        y: "100vh",
        opacity: 0.5,
    },
};

export default function ViewBudget({ handleClose }: { handleClose: () => void }) {
    const data = useBudget();

    let isBudget = data?.budgets.length !== 0;

    return (
        <BackDrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                variants={jumpIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-11/12 lg:w-2/3 2xl:w-1/3 text-center rounded-lg bg-white"
            >
                {isBudget ? (
                    <>
                        <div>All Budgets</div>

                        {data?.budgets.map((e) => (
                            <div
                                key={e.id}
                                className="flex justify-between px-4 py-2"
                            >
                                <div>{e.name}</div>
                                <motion.button
                                    onClick={() => {
                                        data?.deleteBudget(e.id);
                                    }}
                                    whileTap={{ scale: 0.93 }}
                                    className="text-red-500"
                                >
                                    <BsFillTrashFill />
                                </motion.button>
                            </div>
                        ))}
                    </>
                ) : (
                    <span className="text-3xl mx-auto">No Budgets</span>
                )}
            </motion.div>
        </BackDrop>
    );
}
