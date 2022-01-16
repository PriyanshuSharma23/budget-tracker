import { motion } from "framer-motion";
import { useBudget } from "../../contexts/BudgetContext";
import { BsFillTrashFill } from "react-icons/bs";
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

type Props = {
    budgetId: string;
    handleClose: () => void;
    name: string;
};

function ViewExpense({ name, handleClose, budgetId }: Props) {
    // const { budgets, expenses , deleteExpense } = useBudget();
    const data = useBudget();

    let isExpense =
        data?.expenses.filter((e) => {
            return e.budgetId === budgetId;
        }).length !== 0;

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
                {isExpense ? (
                    <>
                        <div>{name}</div>

                        {data?.expenses.map((e) =>
                            e.budgetId === budgetId ? (
                                <div
                                    key={e.id}
                                    className="flex justify-between px-4 py-2"
                                >
                                    <div>{e.description}</div>
                                    <motion.button
                                        onClick={() => {
                                            data?.deleteExpense(e.id);
                                        }}
                                        whileTap={{ scale: 0.93 }}
                                        className="text-red-500"
                                    >
                                        <BsFillTrashFill />
                                    </motion.button>
                                </div>
                            ) : (
                                ""
                            )
                        )}
                    </>
                ) : (
                    <span className="text-3xl mx-auto">No Expenses</span>
                )}
            </motion.div>
        </BackDrop>
    );
}

export default ViewExpense;
