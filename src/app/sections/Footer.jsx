import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 text-right" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">لابيفاي</h3>
            <p className="text-gray-400">
              وجهتك الموثوقة للحواسيب المحمولة المتميزة
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <div className="space-y-2 text-gray-400">
              <p>البريد: info@lapify.com</p>
              <p>
                <span className="ml-2">الهاتف:</span>
                <span dir="ltr" className="inline-block">
                  +90 5380335281
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400">
          <p>جميع الحقوق محفوظة لابيفاي {new Date().getFullYear()} ©</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
