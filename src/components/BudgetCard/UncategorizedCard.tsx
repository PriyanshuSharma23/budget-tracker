import { UNCATEGORIZED, useBudget } from "../../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

function UncategorizedCard() {
    const data = useBudget();
    const amount = data?.expenses.reduce(function (reducer, curr) {
        if (curr.budgetId === UNCATEGORIZED) return reducer + curr.amount;
        else return reducer;
    }, 0);

    return <BudgetCard amount={amount ? amount : 0} budgetId={UNCATEGORIZED} hideButtons={false} max={0} name="Uncategorized" />;
}

export default UncategorizedCard;
