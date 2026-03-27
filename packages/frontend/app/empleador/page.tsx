'use client';

import AppHeader from '@/components/shared/AppHeader';
import ContractStatus from '@/components/employer/ContractStatus';
import CreateContractForm from '@/components/employer/CreateContractForm';
import DepositForm from '@/components/employer/DepositForm';
import TerminateSection from '@/components/employer/TerminateSection';
import { useContract } from '@/providers/ContractProvider';
import { stroopsToDolares } from '@/lib/format';

export default function EmpleadorPage() {
  const { info, balance, isLoading } = useContract();

  const hasContract = !!info;
  const isTerminated = info?.isTerminated || false;

  return (
    <div className="min-h-screen">
      <AppHeader />
      <div className="pt-20 px-4 pb-8 max-w-lg mx-auto space-y-4">
        {isLoading && !info && (
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-slate-200 rounded-xl" />
            <div className="h-48 bg-slate-200 rounded-xl" />
          </div>
        )}

        {!isLoading && !hasContract && (
          <CreateContractForm />
        )}

        {hasContract && info && balance && (
          <>
            <ContractStatus info={info} balance={balance} />

            {!isTerminated && (
              <>
                <DepositForm
                  savingsPct={info.savingsPct}
                  severancePct={info.severancePct}
                />
                <TerminateSection
                  severanceAmount={stroopsToDolares(balance.severance)}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
