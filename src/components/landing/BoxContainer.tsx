import { ReactNode } from "react";

export default function BoxContainer({ title, children }: { title: string, children: ReactNode }) {
    return (
        <div className="box-container">
            <div className="box-title">{ title }</div>
            <div className="box-content">
                { children }
            </div>
        </div>
    );
};