import { motion } from "framer-motion";
import BackDrop from "./Overlay";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { v4 } from "uuid";
import { useBudget } from "../../contexts/BudgetContext";

const vars = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
    },
    exit: {
        y: "-100vh",
        opacity: 0,
    },
};

type Props = {
    handleClose: () => void;
};

function BudgetModal({ handleClose }: Props) {
    const [name, setName] = useState("");
    const [budgetLimit, setBudgetLimit] = useState("");
    const [errorStatement, setErrorStatement] = useState<string | null>(null);

    const data = useBudget();

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        if (!name || !budgetLimit) {
            setErrorStatement("Feilds can't be left empty");
            return;
        }

        let newBudget = {
            name: name,
            totalAmount: parseInt(budgetLimit),
            id: v4(),
        };
        data?.addBudget(newBudget);
        handleClose();
        setName("");
        setBudgetLimit("");
        setErrorStatement(null);
    }

    return (
        <BackDrop onClick={handleClose}>
            <motion.div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="w-11/12 lg:w-2/3 2xl:w-1/3 rounded-lg bg-white"
                variants={vars}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Input Form */}
                <div className="px-4 py-2">
                    {/* Header */}
                    <div className="flex justify-between mb-3">
                        <h1 className="text-2xl">Add Budget</h1>
                        <motion.button
                            whileHover={{
                                color: "rgb(248 113 113)",
                                scale: 1.08,
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleClose}
                            className="text-2xl text-gray-400"
                        >
                            <AiFillCloseCircle />
                        </motion.button>
                    </div>
                    {/* Form Section */}
                    <form className="border-t-2 pt-5">
                        {/* Errors */}
                        <div className="text-red-500 text-lg">
                            <i>{errorStatement}</i>
                        </div>
                        <label className="text-xl"> Budget Title </label>
                        <input
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            type="text"
                            className="w-full border h-10 my-5 px-3 py-1"
                        />
                        <label className="text-xl">Budget Limit</label>
                        <input
                            type="number"
                            step={1}
                            min={0}
                            value={budgetLimit}
                            onChange={(e) => {
                                setBudgetLimit(e.target.value);
                            }}
                            className="w-full border h-10 my-5 px-3 py-1"
                        />
                        <button
                            onClick={(e) => {
                                handleSubmit(e);
                            }}
                            className="text-2xl text-center rounded-lg hover:bg-green-600 bg-green-400 text-white px-4 py-2"
                        >
                            Add
                        </button>
                    </form>
                </div>
            </motion.div>
        </BackDrop>
    );
}

export default BudgetModal;
