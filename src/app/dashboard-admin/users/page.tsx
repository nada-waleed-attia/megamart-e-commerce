"use client";

import { useState } from 'react';
import styles from './users.module.css';
import { 
  AdminUser, 
  UserRole,
  UserStatus,
  MOCK_ADMIN_USERS, 
  USER_ROLES,
  USER_STATUS_LABELS,
  USER_STATUS_COLORS,
  ROLE_PERMISSIONS
} from '@/app/models/admin-user';
import { MdAdd, MdEdit, MdDelete, MdSearch, MdClose } from 'react-icons/md';

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState<Partial<AdminUser>>({
    name: '',
    email: '',
    phone: '',
    role: 'viewer',
    status: 'active'
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'viewer',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleDelete = (userId: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleSave = () => {
    if (editingUser) {
      // تعديل مستخدم موجود
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { 
              ...u, 
              ...formData,
              permissions: ROLE_PERMISSIONS[formData.role as UserRole]
            } 
          : u
      ));
    } else {
      // إضافة مستخدم جديد
      const newUser: AdminUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: formData.name!,
        email: formData.email!,
        phone: formData.phone!,
        role: formData.role as UserRole,
        status: formData.status as UserStatus,
        createdAt: new Date().toISOString(),
        permissions: ROLE_PERMISSIONS[formData.role as UserRole]
      };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' as UserStatus }
        : u
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>إدارة المستخدمين</h1>
          <p className={styles.subtitle}>إدارة المستخدمين الإداريين والصلاحيات</p>
        </div>
        <button className={styles.addButton} onClick={handleAdd}>
          <MdAdd size={20} />
          إضافة مستخدم
        </button>
      </div>

      {/* Search */}
      <div className={styles.searchBox}>
        <MdSearch size={20} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="ابحث باسم المستخدم أو البريد الإلكتروني..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{users.length}</div>
          <div className={styles.statLabel}>إجمالي المستخدمين</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {users.filter(u => u.status === 'active').length}
          </div>
          <div className={styles.statLabel}>نشط</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {users.filter(u => u.role === 'super_admin' || u.role === 'admin').length}
          </div>
          <div className={styles.statLabel}>مدراء</div>
        </div>
      </div>

      {/* Users Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>المستخدم</th>
              <th>البريد الإلكتروني</th>
              <th>الهاتف</th>
              <th>الدور</th>
              <th>الحالة</th>
              <th>تاريخ الإنشاء</th>
              <th>آخر دخول</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.emptyState}>
                  لا توجد نتائج
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles.userInfo}>
                      <div className={styles.userAvatar}>
                        {user.name.charAt(0)}
                      </div>
                      <span className={styles.userName}>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span 
                      className={styles.roleBadge}
                      style={{ backgroundColor: USER_ROLES[user.role].color }}
                    >
                      {USER_ROLES[user.role].label}
                    </span>
                  </td>
                  <td>
                    <label className={styles.toggleSwitch}>
                      <input
                        type="checkbox"
                        checked={user.status === 'active'}
                        onChange={() => toggleUserStatus(user.id)}
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                    <span 
                      className={styles.statusText}
                      style={{ color: USER_STATUS_COLORS[user.status] }}
                    >
                      {USER_STATUS_LABELS[user.status]}
                    </span>
                  </td>
                  <td className={styles.date}>{formatDate(user.createdAt)}</td>
                  <td className={styles.date}>
                    {user.lastLogin ? formatDate(user.lastLogin) : '-'}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleEdit(user)}
                        title="تعديل"
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDelete(user.id)}
                        title="حذف"
                        disabled={user.role === 'super_admin'}
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingUser ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}</h2>
              <button
                className={styles.closeButton}
                onClick={() => setShowModal(false)}
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.label}>الاسم *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="أحمد محمد"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>البريد الإلكتروني *</label>
                <input
                  type="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>رقم الهاتف *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+20 123 456 7890"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>الدور *</label>
                <select
                  className={styles.select}
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                >
                  {Object.entries(USER_ROLES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label} - {value.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>الحالة *</label>
                <select
                  className={styles.select}
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                >
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                  <option value="suspended">موقوف</option>
                </select>
              </div>

              {formData.role && (
                <div className={styles.permissionsInfo}>
                  <h4>الصلاحيات المتاحة لهذا الدور:</h4>
                  <div className={styles.permissionsList}>
                    {ROLE_PERMISSIONS[formData.role as UserRole]?.map((perm) => (
                      <span key={perm} className={styles.permissionBadge}>
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowModal(false)}
              >
                إلغاء
              </button>
              <button
                className={styles.saveButton}
                onClick={handleSave}
                disabled={!formData.name || !formData.email || !formData.phone}
              >
                {editingUser ? 'حفظ التغييرات' : 'إضافة'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
