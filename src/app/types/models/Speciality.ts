export interface Speciality {
    id: number;
    parent_id: number;
    title_en: string;
    title_ar: string;
    picture_url: string;
    fee: number;
    commission: number;
    commission_type: number;
    children?: Speciality[];
    parent?: Speciality;
}
