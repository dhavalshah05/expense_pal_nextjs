import SidebarHost from "@/features/shared/components/sidebar/SidebarHost";
import getUser from "@/features/shared/hooks/get-user";

export default async function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) {
    const user = await getUser();

    return (
        <SidebarHost userEmail={user.userEmail}>
            {children}
        </SidebarHost>
    );
}
