import { useCallback, useRef } from "react"
import { useCustomFetch } from "src/hooks/useCustomFetch"
import { SetTransactionApprovalParams } from "src/utils/types"
import { TransactionPane } from "./TransactionPane"
import { SetTransactionApprovalFunction, TransactionsComponent } from "./types"

export const Transactions: TransactionsComponent = ({ transactions }) => {
  const { fetchWithoutCache, loading } = useCustomFetch()

  /*
   * The initial value is a empty object, 
   * and it will store the data in the format:
   * transactionId: string
   * approvalStatus: boolean
   */
  const transactionsRef = useRef({});

  const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
    async ({ transactionId, newValue }) => {
      await fetchWithoutCache<void, SetTransactionApprovalParams>("setTransactionApproval", {
        transactionId,
        value: newValue,
      })
    },
    [fetchWithoutCache]
  )

  if (transactions === null) {
    return <div className="RampLoading--container">Loading...</div>
  }

  return (
    <div data-testid="transaction-container">
      {transactions.map((transaction) => (
        <TransactionPane
          loading={loading}
          key={transaction.id}
          transaction={transaction}
          transactionsRef={transactionsRef}
          setTransactionApproval={setTransactionApproval}
        />
      ))}
    </div>
  )
}
