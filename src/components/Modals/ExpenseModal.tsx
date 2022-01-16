import { useState } from "react";
import BackDrop from "./Overlay";
import { AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { UNCATEGORIZED, useBudget } from "../../contexts/BudgetContext";
import { v4 } from "uuid";

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
    defaultValue?: string;
    handleClose: () => void;
};

function ExpenseCard({ defaultValue = UNCATEGORIZED, handleClose }: Props) {
    const [description, setDescription] = useState("");
    const [moneySpent, setMoneySpent] = useState<string>("");
    const data = useBudget();
    const [option, setOption] = useState<string>(defaultValue);

    const [errorStatement, setErrorStatement] = useState("");

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (!description) {
            setErrorStatement("Please enter a description");
            return;
        }
        if (!moneySpent) {
            setErrorStatement("Money spent can't be 0");
            return;
        }

        let newExpense = {
            description: description,
            budgetId: option ? option : data?.budgets[0].id,
            id: v4(),
            amount: parseInt(moneySpent),
        };

        data?.addExpense(newExpense);

        setErrorStatement("");
        setMoneySpent("");
        setDescription("");

        handleClose();
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
                        <label className="text-xl"> Description </label>
                        <input
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            type="text"
                            className="w-full border h-10 my-5 px-3 py-1"
                        />
                        <label className="text-xl">Money Spent</label>
                        <input
                            type="number"
                            step={1}
                            min={0}
                            value={moneySpent}
                            onChange={(e) => {
                                setMoneySpent(e.target.value);
                            }}
                            className="w-full border h-10 my-5 px-3 py-1"
                        />
                        <div className="flex text-xl mb-2 gap-2">
                            <label>Select Budget</label>
                            <select
                                value={option}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setOption(e.target.value);
                                }}
                                className="w-full px-3 py-2 rounded-lg"
                            >
                                <option value={UNCATEGORIZED}>Uncategorized</option>
                                {data?.budgets.map((budget) => (
                                    <option key={budget.id} value={budget.id}>
                                        {budget.name}
                                    </option>
                                ))}
                            </select>
                        </div>
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

export default ExpenseCard;
