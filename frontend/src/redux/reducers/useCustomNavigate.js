// useCustomNavigate.js
import { useNavigate } from 'react-router-dom';

export function useCustomNavigate() {
    const navigate = useNavigate();

    function customNavigate(path) {
        navigate(path);
    }

    return customNavigate;
}
