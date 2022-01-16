import { useBudget } from "../../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

function TotalCard() {
    const data = useBudget();
    const total = data?.budgets.reduce(function (reducer, curr) {
        return reducer + curr.totalAmount;
    }, 0);
    const spent = data?.expenses.reduce(function (reducer, curr) {
        return reducer + curr.amount;
    }, 0);

    
    return <>
        <BudgetCard amount={spent ? spent : 0} max={total ? total : 0} name="Total" hideButtons />
        <div className=" mb-6"></div>
    </>
}

export default TotalCard;
