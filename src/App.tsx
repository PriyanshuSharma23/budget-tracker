import BottomBar from "./components/BottomBar/BottomBar";
import BudgetCard from "./components/BudgetCard/BudgetCard";
import TotalCard from "./components/BudgetCard/TotalCard";
import UncategorizedCard from "./components/BudgetCard/UncategorizedCard";
import TopBar from "./components/TopBar/TopBar";
import { useBudget } from "./contexts/BudgetContext";

function App() {
    const data = useBudget();

    return (
        <div className="App">
            {/* Top Bar */}
            <TopBar />

            {/* Card Section */}
            <div className="px-5 gap-4 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-cols-max">
                {/* <BudgetCard /> */}
                {data?.budgets.map((budget) => {
                    let total = 0;
                    data?.expenses.forEach((expense) => {
                        if (expense.budgetId === budget.id)
                            total += expense.amount;
                    });
                    return (
                        <div key={budget.id}>
                            <BudgetCard
                                amount={total}
                                hideButtons={false}
                                budgetId={budget.id}
                                max={budget.totalAmount}
                                name={budget.name}
                            />
                        </div>
                    );
                })}
                {data?.expenses.length !== 0 && <UncategorizedCard />}
                {data?.budgets.length !== 0 && <TotalCard />}
                
            </div>
            {/* Bottom Bar */}
            <BottomBar />
        </div>
    );
}

export default App;
