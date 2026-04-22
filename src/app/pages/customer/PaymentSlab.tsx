import { useState } from "react";

const PaymentSlabs = ({ totalAmount = 1000000 }) => {
  const firstSlab = Math.round(totalAmount * 0.4);
  const [secondSlab, setSecondSlab] = useState(0);

  const remaining = totalAmount - firstSlab - secondSlab;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-6">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Payment Plan
          </h2>
          <p className="text-sm text-gray-500">
            Split your payment into 3 easy steps
          </p>
        </div>

        {/* TOTAL */}
        <div className="bg-black text-white rounded-xl p-4 mb-6 flex justify-between items-center">
          <span>Total Amount</span>
          <span className="text-lg font-bold">
            ₹{totalAmount.toLocaleString()}
          </span>
        </div>

        {/* SLAB 1 */}
        <div className="p-4 rounded-xl bg-green-100 mb-4 border border-green-200">
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800">
              Advance Payment
            </h3>
            <span className="text-xs bg-green-200 px-2 py-1 rounded">
              40%
            </span>
          </div>

          <p className="text-2xl font-bold text-green-700 mt-2">
            ₹{firstSlab.toLocaleString()}
          </p>
        </div>

        {/* SLAB 2 */}
        <div className="p-4 rounded-xl bg-white border mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">
            Custom Payment
          </h3>

          <input
            type="number"
            value={secondSlab}
            onChange={(e) => setSecondSlab(Number(e.target.value))}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
            placeholder="Enter amount"
          />

          <p className="text-xs text-gray-500 mt-2">
            Remaining amount auto calculated
          </p>
        </div>

        {/* SLAB 3 */}
        <div className="p-4 rounded-xl bg-blue-100 border border-blue-200 mb-4">
          <h3 className="font-semibold text-gray-800">
            Final Payment
          </h3>

          <p className="text-2xl font-bold text-blue-700 mt-2">
            ₹{remaining > 0 ? remaining.toLocaleString() : 0}
          </p>
        </div>

        {/* ERROR */}
        {remaining < 0 && (
          <div className="text-red-600 text-sm mb-3 text-center">
            Slab 2 amount is too high
          </div>
        )}

        {/* BUTTON */}
        <button
          disabled={remaining < 0}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:bg-gray-400"
        >
          Confirm Plan
        </button>

      </div>
    </div>
  );
};

export default PaymentSlabs;