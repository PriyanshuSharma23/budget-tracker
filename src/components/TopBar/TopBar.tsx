import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BudgetModal from "../Modals/BudgetModal";
import ViewBudget from "../ViewExpense/ViewBudgets";

function TopBar() {
    const [addBudgetModal, setAddBudgetModal] = useState(false);
    const [viewBudgetModal, setViewBudgetModal] = useState(false);

    function setAddModalClose() {
        setAddBudgetModal(false);
    }
    function setAddModalOpen() {
        setAddBudgetModal(true);
    }

    function setViewModalClose() {
        setViewBudgetModal(false);
    }
    function setViewModalOpen() {
        setViewBudgetModal(true);
    }

    return (
        <div>
            <div className="w-full h-3 bg-blue-400"></div>
            <div className="flex justify-between px-5 items-center py-2 border-b-2">
                <div className="text-4xl">Budget Tracker</div>
                <div className="flex gap-2">
                    <motion.button
                        onClick={
                            addBudgetModal ? setAddModalClose : setAddModalOpen
                        }
                        whileTap={{
                            scale: 0.9,
                        }}
                        className="transition-colors border-2 py-1 px-4 rounded-lg text-center text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                        Add Budget
                    </motion.button>
                    <motion.button
                        onClick={
                            viewBudgetModal
                                ? setViewModalClose
                                : setViewModalOpen
                        }
                        whileTap={{
                            scale: 0.9,
                        }}
                        className="transition-all border-2 py-1 px-4 rounded-lg text-center text-gray-600 border-gray-600 hover:bg-gray-600 hover:text-white"
                    >
                        View Budgets
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {addBudgetModal && (
                    <BudgetModal handleClose={setAddModalClose} />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {viewBudgetModal && (
                    <ViewBudget handleClose={setViewModalClose} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default TopBar;
