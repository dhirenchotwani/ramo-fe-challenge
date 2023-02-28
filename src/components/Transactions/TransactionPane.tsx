import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"

export const TransactionPane: TransactionPaneComponent = ({
  loading,
  transaction,
  transactionsRef,
  setTransactionApproval: consumerSetTransactionApproval,
}) => {

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        /**
         * if the id for the transaction exists in the transactionsRef,
         * that means the approval status has been changed and using that for the checked prop
         */
        checked={transactionsRef?.current?.hasOwnProperty(transaction.id) 
          ? !!transactionsRef.current[transaction.id] 
          : transaction.approved
        }
        disabled={loading}
        onChange={async (newValue) => {
          
          // updating the transaction id and the approval value in the ref
          transactionsRef.current = { ...transactionsRef.current, [transaction.id]: newValue }

          await consumerSetTransactionApproval({
            transactionId: transaction.id,
            newValue,
          })
        }}
      />
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
