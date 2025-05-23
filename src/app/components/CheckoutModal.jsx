const CheckoutModal = ({ isOpen, onClose, onConfirm, totalAmount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-right">تأكيد الطلب</h2>
        <div className="mb-4 text-right">
          <p className="mb-2 text-lg">المجموع الكلي: <span className="text-yellow-500 font-bold">${totalAmount}</span></p>
          <p className="text-gray-600">هل تريد المتابعة لإتمام عملية الشراء؟</p>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
          >
            تأكيد الطلب
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
