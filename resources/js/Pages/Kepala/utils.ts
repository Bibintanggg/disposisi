export const sifatSuratLabel = (value: number): string => {
    switch (value) {
        case 1: return "Biasa";
        case 2: return "Penting";
        case 3: return "Rahasia";
        case 4: return "Segera";
        default: return "-";
    }
};

export const sifatSuratBadge = (sifatSurat: number) => {
    switch (sifatSurat) {
        case 4: return { text: "Segera", class: "bg-red-100 text-red-700", icon: "alert" };
        case 2: return { text: "Penting", class: "bg-orange-100 text-orange-700", icon: "bell" };
        case 1: return { text: "Biasa", class: "bg-gray-100 text-gray-600", icon: "none" };
        case 3: return { text: "Rahasia", class: "bg-indigo-100 text-indigo-700", icon: "none" };
        default: return { text: "-", class: "bg-gray-100 text-gray-500", icon: "none" };
    }
};
