import AdminNavbar from "@/components/common/AdminNavbar";

export default function DashboardLayout({ children }) {
    return (
        <>
            <AdminNavbar />
            <main>{children}</main>
        </>


    )
}