import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ExpenseCard from "../Modals/ExpenseModal";
import ViewExpense from "../ViewExpense/ViewExpense";
import type { budget } from "../../contexts/BudgetContext";
import { currencyFormatter } from "../../utils";

type Props = {
    name: budget["name"];
    max: budget["totalAmount"];
    budgetId?: budget["id"];
    hideButtons: boolean;
    amount: number;
};

function BudgetCard({ name, amount, max, hideButtons, budgetId }: Props) {
    const [expenseModalShow, setExpenseModalShow] = useState(false);
    const [viewExpenseModalShow, setViewExpenseModalShow] = useState(false);

    const openExpenseModal = () => setExpenseModalShow(true);
    const closeExpenseModal = () => setExpenseModalShow(false);

    const openViewModal = () => setViewExpenseModalShow(true);
    const closeViewModal = () => setViewExpenseModalShow(false);

    function variant(amount: number, max: number) {
        let percentage = amount / max;
        if (percentage < 0.5) return "bg-green-400";
        else if (percentage < 0.75) return "bg-yellow-400";
        else return "bg-red-400";
    }

    return (
        <div>
            <div className="border shadow-lg rounded-lg py-2 px-5">
                <div className="flex justify-between">
                    <h2 className="text-2xl">
                        {name} {/* {name} */}
                    </h2>
                    <div className="mb-4">
                        <span className="text-xl">
                            {currencyFormatter.format(amount)} {/* {amount} */}
                        </span>
                        {max !== 0 && (
                            <span className="text-lg text-gray-700">
                                / {currencyFormatter.format(max)} {/* {max} */}
                            </span>
                        )}
                    </div>
                </div>
                {/* Progress Bar */}
                {max !== 0 && (
                    <div>
                        <div className="w-full">
                            {/* Gray Capsule */}
                            <div className="transition-all h-4 w-full bg-gray-300 -z-10 relative rounded-full overflow-hidden">
                                <div
                                    className={`${variant(
                                        amount,
                                        max
                                    )} h-full transition-all duration-300`}
                                    style={{
                                        width: `${(amount * 100) / max}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Buttons */}
                {!hideButtons && (
                    <div className="flex justify-end gap-2 my-2">
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                            }}
                            className={`transition-colors text-xl px-4 py-2 border-2 rounded-lg text-green-500 border-green-500 hover:text-white hover:bg-green-500`}
                            onClick={
                                expenseModalShow
                                    ? closeExpenseModal
                                    : openExpenseModal
                            }
                        >
                            Add Expense
                        </motion.button>
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                            }}
                            className="transition-colors text-xl px-4 py-2 border-2 rounded-lg border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
                            onClick={
                                viewExpenseModalShow
                                    ? closeViewModal
                                    : openViewModal
                            }
                        >
                            View Expenses
                        </motion.button>
                        <AnimatePresence>
                            {expenseModalShow && (
                                <ExpenseCard
                                    defaultValue={budgetId}
                                    handleClose={closeExpenseModal}
                                />
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {viewExpenseModalShow && (
                                <ViewExpense
                                    name={name}
                                    budgetId={budgetId ? budgetId : ""}
                                    handleClose={closeViewModal}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BudgetCard;
