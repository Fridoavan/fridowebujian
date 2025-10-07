import * as React from "react";
import { cn } from "@/lib/utils";

export const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-x-auto rounded-2xl shadow-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-[1px]">
    <div className="rounded-2xl bg-gray-900">
      <table
        ref={ref}
        className={cn("w-full text-sm text-left text-gray-300", className)}
        {...props}
      />
    </div>
  </div>
));
Table.displayName = "Table";

export const TableHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead
    className={cn(
      "bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-gray-100 text-xs uppercase font-semibold tracking-wider",
      className
    )}
    {...props}
  />
);
TableHeader.displayName = "TableHeader";

export const TableBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn("divide-y divide-gray-700", className)} {...props} />
);
TableBody.displayName = "TableBody";

export const TableRow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      "transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-700/30 hover:to-blue-700/30 hover:shadow-md hover:scale-[1.01]",
      className
    )}
    {...props}
  />
);
TableRow.displayName = "TableRow";

export const TableHead = ({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      "px-6 py-4 text-left text-gray-100 border-b border-gray-700",
      className
    )}
    {...props}
  />
);
TableHead.displayName = "TableHead";

export const TableCell = ({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={cn(
      "px-6 py-4 border-b border-gray-800 text-gray-300 whitespace-nowrap",
      className
    )}
    {...props}
  />
);
TableCell.displayName = "TableCell";
