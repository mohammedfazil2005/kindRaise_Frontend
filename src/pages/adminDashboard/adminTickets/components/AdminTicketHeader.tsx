import { Ticket } from "lucide-react";

const AdminTicketHeader = () => {

    return (
        <div className="space-y-6">

            {/* Top Header */}
            <div className="flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md">
                        <Ticket size={18} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            Support Tickets
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Manage and respond to user support requests
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminTicketHeader;