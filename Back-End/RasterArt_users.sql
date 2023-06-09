PGDMP         
                {        	   RasterArt    15.1    15.1 /    5           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            6           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            7           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            8           1262    29374 	   RasterArt    DATABASE     ~   CREATE DATABASE "RasterArt" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Italian_Italy.1252';
    DROP DATABASE "RasterArt";
                postgres    false            �            1259    29383    photo    TABLE     �   CREATE TABLE public.photo (
    id bigint NOT NULL,
    alt character varying(255),
    description character varying(255),
    nickname character varying(255),
    url character varying(255)
);
    DROP TABLE public.photo;
       public         heap    postgres    false            �            1259    29382    photo_id_seq    SEQUENCE     u   CREATE SEQUENCE public.photo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.photo_id_seq;
       public          postgres    false    217            9           0    0    photo_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.photo_id_seq OWNED BY public.photo.id;
          public          postgres    false    216            �            1259    29391    photo_likes    TABLE     d   CREATE TABLE public.photo_likes (
    photo_id bigint NOT NULL,
    likes character varying(255)
);
    DROP TABLE public.photo_likes;
       public         heap    postgres    false            �            1259    29376    roles    TABLE     W   CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(20)
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    29375    roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public          postgres    false    215            :           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public          postgres    false    214            �            1259    29394    user_follows    TABLE     f   CREATE TABLE public.user_follows (
    user_id bigint NOT NULL,
    follows character varying(255)
);
     DROP TABLE public.user_follows;
       public         heap    postgres    false            �            1259    29403 	   user_info    TABLE     �   CREATE TABLE public.user_info (
    id bigint NOT NULL,
    description character varying(255),
    profile_photo character varying(255),
    username character varying(255)
);
    DROP TABLE public.user_info;
       public         heap    postgres    false            �            1259    29402    user_info_id_seq    SEQUENCE     y   CREATE SEQUENCE public.user_info_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_info_id_seq;
       public          postgres    false    222            ;           0    0    user_info_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.user_info_id_seq OWNED BY public.user_info.id;
          public          postgres    false    221            �            1259    29397 
   user_roles    TABLE     ^   CREATE TABLE public.user_roles (
    user_id bigint NOT NULL,
    role_id integer NOT NULL
);
    DROP TABLE public.user_roles;
       public         heap    postgres    false            �            1259    29412    users    TABLE     �   CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying(50),
    name character varying(255),
    password character varying(120),
    surname character varying(255),
    username character varying(20)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    29411    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    224            <           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    223            �           2604    29386    photo id    DEFAULT     d   ALTER TABLE ONLY public.photo ALTER COLUMN id SET DEFAULT nextval('public.photo_id_seq'::regclass);
 7   ALTER TABLE public.photo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    29379    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �           2604    29406    user_info id    DEFAULT     l   ALTER TABLE ONLY public.user_info ALTER COLUMN id SET DEFAULT nextval('public.user_info_id_seq'::regclass);
 ;   ALTER TABLE public.user_info ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    29415    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            +          0    29383    photo 
   TABLE DATA           D   COPY public.photo (id, alt, description, nickname, url) FROM stdin;
    public          postgres    false    217   �2       ,          0    29391    photo_likes 
   TABLE DATA           6   COPY public.photo_likes (photo_id, likes) FROM stdin;
    public          postgres    false    218   ;       )          0    29376    roles 
   TABLE DATA           )   COPY public.roles (id, name) FROM stdin;
    public          postgres    false    215   �;       -          0    29394    user_follows 
   TABLE DATA           8   COPY public.user_follows (user_id, follows) FROM stdin;
    public          postgres    false    219   �;       0          0    29403 	   user_info 
   TABLE DATA           M   COPY public.user_info (id, description, profile_photo, username) FROM stdin;
    public          postgres    false    222   �<       .          0    29397 
   user_roles 
   TABLE DATA           6   COPY public.user_roles (user_id, role_id) FROM stdin;
    public          postgres    false    220   q>       2          0    29412    users 
   TABLE DATA           M   COPY public.users (id, email, name, password, surname, username) FROM stdin;
    public          postgres    false    224   �>       =           0    0    photo_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.photo_id_seq', 60, true);
          public          postgres    false    216            >           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 2, true);
          public          postgres    false    214            ?           0    0    user_info_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_info_id_seq', 11, true);
          public          postgres    false    221            @           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 11, true);
          public          postgres    false    223            �           2606    29390    photo photo_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.photo
    ADD CONSTRAINT photo_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.photo DROP CONSTRAINT photo_pkey;
       public            postgres    false    217            �           2606    29381    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    215            �           2606    29421 !   users uk3g1j96g94xpk3lpxl2qbl985x 
   CONSTRAINT     \   ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk3g1j96g94xpk3lpxl2qbl985x UNIQUE (name);
 K   ALTER TABLE ONLY public.users DROP CONSTRAINT uk3g1j96g94xpk3lpxl2qbl985x;
       public            postgres    false    224            �           2606    29427 !   users uk6dotkott2kjsp8vw4d0m25fb7 
   CONSTRAINT     ]   ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);
 K   ALTER TABLE ONLY public.users DROP CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7;
       public            postgres    false    224            �           2606    29423 !   users ukc7axdovioy5258of4drgpw13v 
   CONSTRAINT     _   ALTER TABLE ONLY public.users
    ADD CONSTRAINT ukc7axdovioy5258of4drgpw13v UNIQUE (surname);
 K   ALTER TABLE ONLY public.users DROP CONSTRAINT ukc7axdovioy5258of4drgpw13v;
       public            postgres    false    224            �           2606    29425 !   users ukr43af9ap4edm43mmtq01oddj6 
   CONSTRAINT     `   ALTER TABLE ONLY public.users
    ADD CONSTRAINT ukr43af9ap4edm43mmtq01oddj6 UNIQUE (username);
 K   ALTER TABLE ONLY public.users DROP CONSTRAINT ukr43af9ap4edm43mmtq01oddj6;
       public            postgres    false    224            �           2606    29410    user_info user_info_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.user_info DROP CONSTRAINT user_info_pkey;
       public            postgres    false    222            �           2606    29401    user_roles user_roles_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);
 D   ALTER TABLE ONLY public.user_roles DROP CONSTRAINT user_roles_pkey;
       public            postgres    false    220    220            �           2606    29419    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    224            �           2606    29428 '   photo_likes fk6kbwds2lt8sqtk6roi5hxrxdk    FK CONSTRAINT     �   ALTER TABLE ONLY public.photo_likes
    ADD CONSTRAINT fk6kbwds2lt8sqtk6roi5hxrxdk FOREIGN KEY (photo_id) REFERENCES public.photo(id);
 Q   ALTER TABLE ONLY public.photo_likes DROP CONSTRAINT fk6kbwds2lt8sqtk6roi5hxrxdk;
       public          postgres    false    217    3207    218            �           2606    29433 (   user_follows fkdnymu7xayfui3g59fclmjj1fs    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_follows
    ADD CONSTRAINT fkdnymu7xayfui3g59fclmjj1fs FOREIGN KEY (user_id) REFERENCES public.users(id);
 R   ALTER TABLE ONLY public.user_follows DROP CONSTRAINT fkdnymu7xayfui3g59fclmjj1fs;
       public          postgres    false    224    219    3221            �           2606    29438 &   user_roles fkh8ciramu9cc9q3qcqiv4ue8a6    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkh8ciramu9cc9q3qcqiv4ue8a6 FOREIGN KEY (role_id) REFERENCES public.roles(id);
 P   ALTER TABLE ONLY public.user_roles DROP CONSTRAINT fkh8ciramu9cc9q3qcqiv4ue8a6;
       public          postgres    false    220    215    3205            �           2606    29443 &   user_roles fkhfh9dx7w3ubf1co1vdev94g3f    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkhfh9dx7w3ubf1co1vdev94g3f FOREIGN KEY (user_id) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.user_roles DROP CONSTRAINT fkhfh9dx7w3ubf1co1vdev94g3f;
       public          postgres    false    224    220    3221            +   D  x��Z[o�8~f~�橎u�,P,�Mh������D�\˒@Ru��~Ey3N|�}��������e�<r���>�f+ښ.��s��i>?v�+M����b&�v�%�{���\�X��m��Fݖ�n�o:ݩ�Y2��l�n���g���ô~Q�V��Z�%��o��a��dY�V�������5]�ݞޱ�����f�U�~������_x��0�4�Nv1�@�����л�;�@i��g[qI�����d�4������pT#�a��dt���^�#�$A���)���d!�}K?��R%��$��]n����DQ���ZG4!�a�j8Yد��Y���R�R���Cs����
&5�짨�T�~�ƅdޏ4���ܤ���R��i��K�n��k6�:����d�j�kV�������U�I؋Ak.�́��(7���,��t{�b�����=��a�s�� +�������ӂ�����Yv6N�ZN����3S��]xy��j��p|�,Vn)9�ǹ�ԅQ$�<�����	D���� ���Ϝ�O�q�8=���Őr�t�φ�>��i�`���ey�B:D��7�y�^�g,�e+sX6� �T�;�L9�,p��Ő�#r����k�=X�{�%{Y�n�� �J|�A&���а�\.c�&e�m�T��1c�_%kkNX�~�?�f Ŵ�Z�,���c���ə:(�w3���m�g���\�4oUv=v5>��TJF9��<�1j6��Vϒ$�����Z�'�w��,����z#ľ��X);ZqA���F�JЖ��Ř� �Z7lˋ�h!&�
E�Eat������EK��n���Ԓkv}8��;W�ދZ-�i���D��#�Y)��_[l=U������ �,���Y
|��_C�#� ��9K�Lq�$��:tq����m�`���wHq�Ƒ�8�C��ġ�0�cXIyq�N�@$�����ӆ�ӆ�-����$)��݂HV1y��GG�?P�5?��-r� �;0�_$���[��|X]jz$r�����/G�&)�tR�?�*�u���CX�y�Ǒ�-�$��G�n��1a}7��AY�K��gb���ǁ�&q#��@N>(�I=VM'�X���!��I�]�	��-�����.:�ݠ6��*v�R���a᩻����(~�~kΠ&[���`j�BbF/�qli�N�h1dS%��|�'ey(��z� �$^�N�8�H:y��v�?:Vѥ��Wq�$K���C��7�+�,�Δ���"o!�A��;��bHz�I6sn��I[oR���n����cv��~�::8.���������G�!;�,\i��8y�X�8�ނH��d�a�X�Ȅ<���*ѽy���ʏҔ��lǹ�,�d��Ip@�c��_� ��5S��E���C�!'SZt[���MM��bW�
�K\7b�V�w����þ�_�.O���bHv����5�%3]�s�5��$^�7&�+ e	#?~���E�b�Xq֪b�)��|��N]K���C������i�1��t1�C#P�nn̚@d��;��,e<��T���k^q)PGơ8�a�G�Bx��k�֭��<�tmDWq��O�J7��!��2�H���}ڧ������t֟���'� �jkc.&��d���V�+4"�$q5b��ǆ�z���=/K�ԭPG)����`�a�{�7��d5�L]�J)��E�r�T���!���0��gB��_y�����p�͈!���^�mf���U��K�U%�6�`�PtT|_d��6�b�,�Vq=6yO��ʗQ�9��r�ٴ��iX�5'q9`4�������(�<�u�d)�M7@^ɍ,�������Q5E�}ˎ����F1v��""w��ARTL�a���AxRP��Q澄� �TL$;��t�㲁զG�I;&Q/H=?s3"Y�^�r~�����vqJ��c����,N�y����r��,xQqX�δ������:"Yi�f���ԂHV9y�0}2�i*�Y��e7@jwy�o�ľ7W�l[j�9כو#���r~��~N�vN5vU���<�S'��ۛ�������      ,   �   x�M�K� ��a*>лt��6�"��K����1��H啑:&Xk:":��p���fN�(1�\>x�0�4L�˜��a(��6oͿw�h��KK��L��I>���.װ�z�ĴL�LMҨD&�r���	ɽ��ud�!.[.mPg��X����#��ㆈ��      )   !   x�3���q�v�2��]|=��b���� t��      -   �   x�M�M�0��p����]�d�a���V�/1A����{s laIt8��K~C�S(�Y�.��
��D��EO�4u���D{��+������{(��D2V�O�Nʚ`�@�}����na�h+��\�Q�(��ё�~��,_Д%%^v����nD� ܅f�      0   �  x���͎�0���)\UJO~��z詗>�J��č�����k���VjS�i�������^˓o�=��t�2�S��>İ
��B��1M�����~+iL��4���N���������g֡��A�W���t�UY��X�|U@�"~".B�.x�`�V~)2�V�Z[��tЇ�gI�^�Ac��{=N��Y�'׃D�guQ�"/��e_d�g���.�Qc=��U���ܪ�IG+�v�������(.�tb�H�M�+oeV6+�t��F��.1+��h��ɉ�͚���f�-ڡ��C�ۺ��o�Z��WD��#9�Y��{V�V�`Q��j���xXc����rX;��0�g�bp���"�2���V�:5߲<���X���0�B�p�g�v�Q�����"��:on�#��}�2�~�m_      .   .   x�3�4�2�4�2bc 6bS 6bs � bK 64  �1z\\\ ��      2   �  x�E�M{�0���;�Fe� �UA����M�HA!�����3OV�̙���$_��q�,����70}��:���v��6�n��.k+�f>�߫���d��H�!=7h��1"Y�� ]��{Hi�X����UԍwHt��vd���Oy\��Q���҉�A0�7�Qa�'�'$�A�-a&�͢��a�$B��_�\�ڧr�r�l��;:��]�!��w�����i%�\��ʬQ��$���	Z��:A�5�=7�������2�U_�;��r�'��mGp��� 4h�ˏ���-�g�	�$��BVd("�^#�CU���5����o�QI���zLE�i��e)�sU�Ȼ�}q+��f<�����'�S��?��I]��x�giM��ޕ�R���n��a��V�6��a�rS�rgi	N�jp���@�쌹��56X���
�+cUR��I�U(V݊���[�3�͹QgS8�^Mb�`��S~'W*c����Ι8��~-����֓�m'�^��(>�g)�n�n9���U�Ƈkq�pyً��Y�S>q�pce�"�ʷ��A�?ݕF����5�x!Z�j�{-y��q�8iK���Y�̗�+s����[�)���h,���@�c ?�@�ZP/�y/��tG�N5rf�&�fG�9���B����vn��gyb�0	�a��b�c��b(?ߩ����إS��\rY�� S�YIi����M\w7Җ�#�Y���+�Mx�?�e���W�     