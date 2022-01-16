import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

export type budget = {
    name: string;
    totalAmount: number;
    id: string;
};
export type expense = {
    description: string;
    amount: number;
    id: string;
    budgetId?: string;
};

export type context = {
    expenses: expense[];
    budgets: budget[];
    addBudget: (budget: budget) => void;
    addExpense: (expense: expense) => void;
    deleteBudget: (id: string) => void;
    deleteExpense: (id: string) => void;
}

const BudgetContext = createContext<context | undefined>(undefined);

export function useBudget() {
    return useContext(BudgetContext);
}

export const UNCATEGORIZED = "uncategorized";

export function BudgetProvider({ children }: { children: ReactNode }) {
    const [budgets, setBudgets] = useState<budget[]>([]);
    const [expenses, setExpenses] = useState<expense[]>([]);

    useEffect(function () {
        let exsistingBudgets = localStorage.getItem("budgets");
        if (exsistingBudgets) setBudgets(JSON.parse(exsistingBudgets));

        let exsistingExpenses = localStorage.getItem("expenses");
        if (exsistingExpenses) setExpenses(JSON.parse(exsistingExpenses));
    }, []);

    useEffect(
        function () {
            let updatedBudgets = [...budgets];
            localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
        },
        [budgets]
    );

    useEffect(
        function () {
            let updatedExpenses = [...expenses];
            localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
        },
        [expenses]
    );

    function addExpense(expense: expense) {
        setExpenses((prev) => [...prev, expense]);
    }

    function addBudget(budget: budget) {
        if (budgets.find((b) => b.name === budget.name)) return;
        setBudgets((prev) => [...prev, budget]);
    }

    function deleteExpense(id: string) {
        setExpenses((prev) => prev.filter((x) => x.id !== id));
    }

    function deleteBudget(id: string) {
        let updatedExpenses = expenses.map((item) => {
            if (item.budgetId === id)
                return { ...item, budgetId: UNCATEGORIZED };
            else return item;
        });
        setExpenses(updatedExpenses);
        setBudgets((prev) => prev.filter((x) => x.id !== id));
    }

    const passedValues = {
        expenses,
        budgets,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
    }

    return (
        <BudgetContext.Provider
            value={passedValues}
        >
            {children}
        </BudgetContext.Provider>
    );
}
